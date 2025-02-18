import heartIcon from '@/images/heartIcon.svg'
import starIcon from '@/images/starIcon.svg'
import introImage from '@/images/main/IntroImg.jpg'
import review1 from '@/images/main/reviews/img1.png'
import review2 from '@/images/main/reviews/img2.png'
import review3 from '@/images/main/reviews/img3.png'
import review4 from '@/images/main/reviews/img4.png'
import teacher1 from '@/images/main/teachers/teacher1.png'
import teacher2 from '@/images/main/teachers/teacher2.png'
import teacher3 from '@/images/main/teachers/teacher3.png'
import teacher4 from '@/images/main/teachers/teacher4.png'
import teacherPrev1 from '@/images/main/teachers/teacher1prev.png'
import teacherPrev2 from '@/images/main/teachers/teacher2prev.png'
import teacherPrev3 from '@/images/main/teachers/teacher3prev.png'
import teacherPrev4 from '@/images/main/teachers/teacher4prev.png'
import theme1 from '@/images/main/themes/theme1.png'
import theme2 from '@/images/main/themes/theme2.png'
import theme3 from '@/images/main/themes/theme3.png'
import theme4 from '@/images/main/themes/theme4.png'
import theme5 from '@/images/main/themes/theme5.png'

export const mockData = {
    intro: {
        shields: [
            {
                id: 1,
                icon: heartIcon,
                text: '300 000+ учеников'
            },
            {
                id: 2,
                icon: starIcon,
                text: '4.7 из 5 на Отзовике'
            },
            {
                id: 3,
                icon: starIcon,
                text: '4.7 из 5 на Mooc.ru'
            }
        ],
        title: 'Zerro - №1 платформа для онлайн-школы <span>в ру сегменте</span>',
        image: introImage,
        caption: '<sup>*</sup>По версии интернет-портала <a href="https://gosugamers.net" target="_blank">gosugamers.net</a>.'
    },
    themes: {
        title: 'Не только выбор предметов, но и желаемого направления',
        items: [
            {
                id: 1,
                title: 'Математическое<br /> моделирование',
                subject: 'Математика',
                text: `Отличительной особенностью математических моделей, создаваемых в настоящее время, является их комплексность, связанная со сложностью моделируемых объектов.`,
                image: theme1,
                color: '#D9D9D9',
                link: '/subject/1',
            },
            {
                id: 2,
                title: 'Английский язык<br /> для IT-специальности',
                subject: 'Английский язык',
                text: `Снять языковые барьеры, прокачать техническую лексику и поступить в вуз на IT-специальность.`,
                image: theme2,
                color: '#DAD2BF',
                link: '/subject/2',
            },
            {
                id: 3,
                title: 'Причастия<br /> и деепричастия',
                subject: 'Русский язык',
                text: `Причастие и деепричастие — это две особые формы глагола, которые можно отличить по общему значению, морфологическим признакам и синтаксической роли в предложении.`,
                image: theme3,
                color: '#7b98ba',
                link: '/subject/3',
            },
            {
                id: 4,
                title: 'Разбор произведения<br /> на выбор',
                subject: 'Литература',
                text: `Разобрать любое литературное произведение, составить смысловой анализ, поговорить о героях и замысле авторов.`,
                image: theme4,
                color: '#b8b2b2',
                link: '/subject/4',
            },
            {
                id: 5,
                title: 'Мехатроника<br /> и робототехника',
                subject: 'Физика',
                text: `Механика, электроника, программирование - 3 важнейших темы для построения современного робота.`,
                image: theme5,
                color: '#D9D9D9',
                link: '/subject/5',
            },
        ]
    },
    teachers: {
        title: 'Учитесь у сильных преподавателей',
        items: [
            {
                id: 1,
                name: 'Козлова Полина',
                text: `Дипломированный преподаватель английского языка с опытом подготовки к экзаменам на 7.0+ баллов`,
                shields: ['Преподаёт 9 лет', 'Подготовила к IELTS 340+'],
                image: teacher1,
                preview: teacherPrev1
            },
            {
                id: 2,
                name: 'Кожевникова Арина',
                text: `Преподаватель английского языка с опытом работы на международных проектах, в сфере IT и FinTech`,
                shields: ['Преподаёт 7 лет', '130 нашли работу в IT'],
                image: teacher2,
                preview: teacherPrev2
            },
            {
                id: 3,
                name: 'Скребец Нина',
                text: `Преподаватель английского языка с опытом обучения и проживания за границей. Сдала Кембриджский экзамен CAE`,
                shields: ['Преподаёт 3 года', 'Подготовила 80 учеников'],
                image: teacher3,
                preview: teacherPrev3
            },
            {
                id: 4,
                name: 'Рудковский Михаил',
                text: `Преподаватель английского языка с 2015 года. Находит индивидуальный подход к каждому ученику, его целям, интересам и трудностям`,
                shields: ['Преподаёт 8 лет', 'Вывел 400+ учеников'],
                image: teacher4,
                preview: teacherPrev4
            },
        ]
    },
    reviews: {
        title: 'Используйте свои знания легко, <br />как 300 000+ наших учеников',
        items: [
            {
                id: 1,
                name: 'Валерия',
                date: '27 марта 2023',
                text: `Начала заниматься в школе не так давно, но уже чувствуется результат. Так как моей главной проблемой было отсутствие разговорной практики, а в Skyeng я могу получать её ежедневно.`,
                shield: 'Нравятся разговорные клубы',
                image: review1
            },
            {
                id: 2,
                name: 'Ксения',
                date: '28 сентября 2024',
                text: `Я пыталась учить английский ещё в школе. Потом в универе, потом самостоятельно, но мне всегда не хватало структуры и знаний, чтобы научиться думать на английском. 
                    С такими запросом я пришла в Skyeng и занимаюсь с очень классной преподавательницей. Оказывается, английский это ещё и весело:)`,
                shield: 'Полюбила английский',
                image: review2
            },
            {
                id: 3,
                name: 'Андрей',
                date: '15 июня 2023',
                text: `Сначала мне нужно было подготовиться к собеседованию, а потом — сдать IELTS в сжатые сроки :) Спасибо большое Skyeng и моему преподавателю, без вас ничего бы не получилось.`,
                shield: 'Результат уже через 3 месяца',
                image: review3
            },
            {
                id: 4,
                name: 'Виктория',
                date: '24 апреля 2024',
                text: `Откуда я только ни выходила на уроки: дома, из офиса, из гостиницы в командировке, даже из Сапсана! Как круто, что можно заниматься везде с ноутбука, иначе найти время на занятия было бы нереально.`,
                shield: 'Выучила язык в плотном графике',
                image: review4
            }
        ]
    }
}