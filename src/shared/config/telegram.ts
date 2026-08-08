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
  posts: [],
};
