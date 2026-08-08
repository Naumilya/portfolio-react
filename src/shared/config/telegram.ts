export interface TelegramPost {
  id: string;
  date: string;
  text: string;
  url: string;
}

export interface TelegramChannel {
  name: string;
  handle: string;
  url: string;
  description: string;
  cta: string;
  posts: TelegramPost[];
}

export const telegramChannel: TelegramChannel = {
  name: "Утка в сети",
  handle: "@duck_in_the_net",
  url: "https://t.me/duck_in_the_net",
  description:
    "Код, проекты, рисунки и жизнь между ними. Без экспертного пафоса — о разработке, собственных проектах, поиске работы и экспериментах.",
  cta: "Читать канал →",
  posts: [
    {
      "id": "tg-52",
      "date": "8 августа 2026 г. в 22:33",
      "text": "Пока ковыряю своё портфолио, нашёл прикольный сайтик — godly.website\nТам собраны очень кайфовые сайты: необычные интерфейсы, анимации, 3D, всякие странные решения, которые почему-то работают.\nКороче, если тоже иногда сидите и думаете «блять, а как вообще сделать красиво» — вот вам место для вдохновения:\nhttps://godly.website/\nЯ уже оттуда пару идей утащил себе в голову 🦆",
      "url": "https://t.me/duck_in_the_net/52"
    }
  ],
};
