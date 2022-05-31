const books = [
    {
        id: '1',
        name: 'Harry Potter y la piedra filosofal',
        price: 1000,
        category: 'Fantasia , Aventura',
        img: '/img/harryPotterPiedraFilosofal.jpg',
        stock: 3,
        description: 'Primer libro de la saga de Harry Potter'
    },
    {
        id: '2',
        name: 'Los mitos de la historia argentina',
        price: 2000,
        category: 'Historia',
        img: '/img/mitosHistoriaArgentina.jpg',
        stock: 5,
        description: 'De los pueblos originarios y la conquista de América a la independencia.'
    },
    {
        id: '3',
        name: 'Veinte mil leguas de viaje submarino',
        price: 2500,
        category: 'Ciencia Ficcion, aventura',
        img: '/img/viajeSubmarino.jpg',
        stock: 6,
        description: 'una de las obras literarias más conocidas del escritor francés Julio Verne'
    },
    {
        id: '4',
        name: 'El dia que se perdio el amor',
        price: 3000,
        category: 'Romance , Misterio',
        img: '/img/diaQueSePerdioElAmor.jpg',
        stock: 5,
        description: 'El inspector Bowring,intentará descubrir qué esconde una nota amarillenta con el nombre de una mujer que horas después aparece decapitada en un descampado.'
    },
    {
        id: '5',
        name: 'El nombre de la rosa',
        price: 4000,
        category: 'Historia, Misterio',
        img: '/img/elNombreDeLaRosa.jpg',
        stock: 7,
        description: 'Ambientada en el turbulento ambiente religioso del siglo XIV, la novela narra la investigación que realizan fray Guillermo de Baskerville y su pupilo Adso de Melk alrededor de una misteriosa serie de crímenes que suceden en una abadía del norte de Italia.'
    }
]

export const getBooks = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(books)
        }, 2000)
    })
}