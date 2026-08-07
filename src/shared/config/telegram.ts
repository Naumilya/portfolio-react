export interface TelegramPost {
  id: string;
  date: string;
  text: string;
  views: string;
  reactions: string;
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
      id: "post-1",
      date: "Пятница, 19:00",
      text: "Собрал портфолио на React + Three.js. Пиксельная утка теперь живёт прямо на сайте 🦆",
      views: "1.2K",
      reactions: "❤️ 45",
    },
    {
      id: "post-2",
      date: "Среда, 20:30",
      text: "Разбираюсь с микрофронтендами. Главный вывод: модульность — это про границы, а не про технологии.",
      views: "980",
      reactions: "❤️ 32",
    },
    {
      id: "post-3",
      date: "Понедельник, 18:15",
      text: "Нарисовал утку в MagicaVoxel. Теперь она будет преследовать меня везде.",
      views: "1.5K",
      reactions: "❤️ 67",
    },
  ],
};
