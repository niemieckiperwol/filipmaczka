import { useRef, useState, type ChangeEvent } from "react";
import { insert, setIfMissing, useClient, type ArrayOfObjectsInputProps } from "sanity";
import { Box, Button, Card, Flex, Text } from "@sanity/ui";
import { UploadIcon } from "@sanity/icons/Upload";

const BATCH_SIZE = 5;

function uniqueKey() {
  return Math.random().toString(36).slice(2, 12);
}

export function BatchImageUpload(props: ArrayOfObjectsInputProps) {
  const { onChange, readOnly } = props;
  const client = useClient({ apiVersion: "2025-02-19" });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function uploadFiles(files: File[]) {
    setError(null);
    setProgress({ done: 0, total: files.length });
    onChange(setIfMissing([]));

    try {
      for (let start = 0; start < files.length; start += BATCH_SIZE) {
        const batch = files.slice(start, start + BATCH_SIZE);
        const assets = await Promise.all(
          batch.map((file) => client.assets.upload("image", file, { filename: file.name })),
        );
        const items = assets.map((asset) => ({
          _type: "image",
          _key: uniqueKey(),
          asset: { _type: "reference", _ref: asset._id },
        }));
        onChange(insert(items, "after", [-1]));
        setProgress({ done: Math.min(start + batch.length, files.length), total: files.length });
      }
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed");
    } finally {
      setProgress(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function onFilesChosen(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    if (files.length > 0) uploadFiles(files);
  }

  return (
    <Flex direction="column" gap={3}>
      {props.renderDefault(props)}
      <Flex align="center" gap={3}>
        <Button
          icon={UploadIcon}
          mode="ghost"
          text={progress ? `Uploading ${progress.done} / ${progress.total}…` : "Upload multiple photos"}
          disabled={readOnly || progress !== null}
          onClick={() => fileInputRef.current?.click()}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={onFilesChosen}
        />
      </Flex>
      {error && (
        <Card tone="critical" padding={3} radius={2}>
          <Box>
            <Text size={1}>{error}</Text>
          </Box>
        </Card>
      )}
    </Flex>
  );
}
