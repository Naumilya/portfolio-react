from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor
from reportlab.pdfbase.pdfmetrics import stringWidth

OUT = "public/assets/ilya-naumov-cv.pdf"
REG = "/usr/share/fonts/truetype/dejavu/DejaVuSansCondensed.ttf"
BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSansCondensed-Bold.ttf"
pdfmetrics.registerFont(TTFont("DVS", REG))
pdfmetrics.registerFont(TTFont("DVS-B", BOLD))

W, H = A4
c = canvas.Canvas(OUT, pagesize=A4, pageCompression=1)
black = HexColor("#171717")
green = HexColor("#09604f")
gray = HexColor("#666666")
x = 39.7
right = W - 39.7
y = H - 38


def text(s, size=9.2, bold=False, color=black, xx=None, yy=None):
    global y
    xx = x if xx is None else xx
    yy = y if yy is None else yy
    c.setFillColor(color)
    c.setFont("DVS-B" if bold else "DVS", size)
    c.drawString(xx, yy, s)


def section(title):
    global y
    y -= 16
    text(title, 13.3, True, green)
    y -= 17


def bullet(s, size=8.5):
    global y
    c.setFillColor(black)
    c.setFont("DVS", size)
    c.drawString(x + 10, y, "•")
    maxw = right - (x + 18)
    words = s.split()
    lines, line = [], ""
    for word in words:
        test = (line + " " + word).strip()
        if stringWidth(test, "DVS", size) <= maxw:
            line = test
        else:
            lines.append(line)
            line = word
    if line:
        lines.append(line)
    for line in lines:
        c.drawString(x + 18, y, line)
        y -= 10.2


def job(title, period, bullets):
    global y
    text(title, 9.4, True)
    c.setFillColor(gray)
    c.setFont("DVS", 8.2)
    c.drawRightString(right, y, period)
    y -= 11.5
    for item in bullets:
        bullet(item)
    y -= 8


def edu(title, period, bullets):
    global y
    text(title, 9.5, True)
    c.setFillColor(gray)
    c.setFont("DVS", 8.2)
    c.drawRightString(right, y, period)
    y -= 15
    for item in bullets:
        bullet(item)
    y -= 4


text("Наумов Илья Андреевич 03.08.2005", 19.5)
y -= 18
text("Россия, Сергиев Посад / Москва", 9.5)
y -= 11
text("+7 (968) 007-79-51", 9.5)
y -= 11
text("fanadape@gmail.com", 9.5)
y -= 20
headline = "Frontend-разработчик, 2+ года коммерческого опыта"
text(headline, 13.1, True)
c.setLineWidth(0.65)
c.line(x, y - 2, x + stringWidth(headline, "DVS-B", 13.1), y - 2)
y -= 8

section("Опыт работы")
job("SkillStaff / проект «Лемана ПРО» - Frontend-разработчик", "2024 - 2025", [
    "Разрабатывал микрофронтенды для B2B/CRM-, HR- и административных систем;",
    "Создавал формы, карточки, поиск, фильтрацию и условное отображение данных;",
    "Интегрировал REST API и BFF, реализовал клиентскую часть real-time чата через WebSocket;",
    "Работал с legacy-кодом, Storybook, SonarQube, code review, тестированием и релизами.",
])
job("Московское экскурсионное бюро - Frontend-разработчик", "2023 - 2024", [
    "Разрабатывал и поддерживал коммерческий сайт mskburo.ru;",
    "Создавал страницы, компоненты, формы и интерактивные элементы;",
    "Работал с API и данными, исправлял ошибки и сопровождал проект после запуска.",
])
job("Фриланс - Frontend-разработчик, верстальщик", "2021 - 2023", [
    "Начал карьеру с адаптивной вёрстки лендингов, сайтов-визиток и небольших интерфейсов;",
    "Выполнил 40+ заказов и доработок на разных площадках;",
    "Создал более 10 вёрсток и несколько полноценных веб-приложений.",
])

section("Образование")
edu("Московский технологический институт (МТИ), Москва", "2026 - 2029", [
    "Направление 27.03.04 «Управление в технических системах»;",
    "Профиль «Системы и средства автоматизации технологических процессов», бакалавриат.",
])
edu("Московский приборостроительный техникум им. Г. В. Плеханова (МПТ), Москва", "2021 - 2025", [
    "Специальность 09.02.07 «Информационные системы и программирование», квалификация «Разработчик веб- и мультимедийных приложений», диплом с отличием;",
    "Изучал веб-разработку, базы данных, информационные системы и методологии разработки;",
    "За время обучения создал более 10 вёрсток и несколько полноценных приложений.",
])

section("Дополнительный опыт и достижения")
for item in [
    "Английский язык - B1;",
    "Участник IT Purple Hack 2024: командная работа над кейсом Авито;",
    "Codewars - 4 kyu.",
]:
    bullet(item)
y -= 2

section("Стек")
text("React, TypeScript, JavaScript, Redux Toolkit, HTML, CSS, REST API, WebSocket, Storybook, Git, Vite", 8.6, xx=x + 28)
y -= 2

section("Хобби")
for item in ["Рисование", "Готовка", "Калистеника"]:
    bullet(item)

c.save()
