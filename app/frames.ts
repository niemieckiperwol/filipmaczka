export type Frame = {
  src: string;
  width: number;
  height: number;
  model: string;
};

export type Session = {
  slug: string;
  model: string;
  frames: Frame[];
};

export const sessions: Session[] = [
  {
    slug: "anna-kuta",
    model: "Anna Kuta",
    frames: [
      { src: "/images/anna-kuta/01.jpg", width: 1583, height: 2000, model: "Anna Kuta" },
      { src: "/images/anna-kuta/02.jpg", width: 1579, height: 2000, model: "Anna Kuta" },
      { src: "/images/anna-kuta/03.jpg", width: 1583, height: 2000, model: "Anna Kuta" },
      { src: "/images/anna-kuta/04.jpg", width: 1583, height: 2000, model: "Anna Kuta" },
      { src: "/images/anna-kuta/05.jpg", width: 1583, height: 2000, model: "Anna Kuta" },
      { src: "/images/anna-kuta/06.jpg", width: 1579, height: 2000, model: "Anna Kuta" },
    ],
  },
  {
    slug: "ivan-konon",
    model: "Ivan Konon",
    frames: [
      { src: "/images/ivan-konon/01.jpg", width: 1600, height: 2000, model: "Ivan Konon" },
      { src: "/images/ivan-konon/02.jpg", width: 1600, height: 2000, model: "Ivan Konon" },
      { src: "/images/ivan-konon/03.jpg", width: 1600, height: 2000, model: "Ivan Konon" },
      { src: "/images/ivan-konon/04.jpg", width: 1600, height: 2000, model: "Ivan Konon" },
      { src: "/images/ivan-konon/05.jpg", width: 1600, height: 2000, model: "Ivan Konon" },
    ],
  },
  {
    slug: "jozefinakielb",
    model: "Józefina Kielb",
    frames: [
      { src: "/images/jozefinakielb/01.jpg", width: 1600, height: 2000, model: "Józefina Kielb" },
      { src: "/images/jozefinakielb/02.jpg", width: 1600, height: 2000, model: "Józefina Kielb" },
      { src: "/images/jozefinakielb/03.jpg", width: 1600, height: 2000, model: "Józefina Kielb" },
      { src: "/images/jozefinakielb/04.jpg", width: 1541, height: 2000, model: "Józefina Kielb" },
      { src: "/images/jozefinakielb/05.jpg", width: 1600, height: 2000, model: "Józefina Kielb" },
      { src: "/images/jozefinakielb/06.jpg", width: 1600, height: 2000, model: "Józefina Kielb" },
    ],
  },
  {
    slug: "ania-lisia",
    model: "Ania Lisia",
    frames: [
      { src: "/images/ania-lisia/01.jpg", width: 1440, height: 1797, model: "Ania Lisia" },
      { src: "/images/ania-lisia/02.jpg", width: 1278, height: 1797, model: "Ania Lisia" },
      { src: "/images/ania-lisia/03.jpg", width: 1440, height: 1797, model: "Ania Lisia" },
      { src: "/images/ania-lisia/04.jpg", width: 1440, height: 1797, model: "Ania Lisia" },
      { src: "/images/ania-lisia/05.jpg", width: 1440, height: 1797, model: "Ania Lisia" },
      { src: "/images/ania-lisia/06.jpg", width: 1440, height: 1797, model: "Ania Lisia" },
      { src: "/images/ania-lisia/07.jpg", width: 1188, height: 1797, model: "Ania Lisia" },
      { src: "/images/ania-lisia/08.jpg", width: 1275, height: 1797, model: "Ania Lisia" },
      { src: "/images/ania-lisia/09.jpg", width: 1272, height: 1797, model: "Ania Lisia" },
    ],
  },
  {
    slug: "wiktoria-podborowska",
    model: "Wiktoria Podborowska",
    frames: [
      { src: "/images/wiktoria-podborowska/01.jpg", width: 1440, height: 949, model: "Wiktoria Podborowska" },
      { src: "/images/wiktoria-podborowska/02.jpg", width: 1152, height: 1447, model: "Wiktoria Podborowska" },
      { src: "/images/wiktoria-podborowska/03.jpg", width: 1440, height: 1152, model: "Wiktoria Podborowska" },
      { src: "/images/wiktoria-podborowska/04.jpg", width: 1440, height: 1151, model: "Wiktoria Podborowska" },
    ],
  },
];

export const allFrames: Frame[] = sessions.flatMap((session) => session.frames);

export function findSession(slug: string) {
  return sessions.find((session) => session.slug === slug);
}
