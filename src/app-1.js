import React, {useState, useMemo} from "react";

const products = [
    { id: 1, name: 'Prod A' },
    { id: 2, name: 'Prod B'},
];

const App1 = (props) => {
    const [text, setText] = useState('');
    const [search, setSearch] = useState('');

    const handleText = (event) => {
        setText(event.target.value);
    };

    const handleSearch = () => {
        setSearch(text);
    };

    // Filtrowanie produktow powinno odbywać się tylko wtedy, kiedy naciśniesz przycisk
    // Filter products, bo tylko wtedy zmienia się wartość napisu search, na podstawie
    // której odbywa się filtrowanie

    // Jednak kiedy wpisujesz cokolwiek w pole tekstowe modyfikując wartość napisu text
    // to ciągle operacja filtrowania jest wywoływana od nowa. Takie zachowanie nie jest
    // nam potrzebne. Stosujemy useMemo w konfiguracji jak poniżej. Wtedy funkcja zostanie
    // wywołana tylko wtedy kiedy zmienia się wartość napisu search.

    // Bez wykorzystania useMemo
    /*const filteredProducts = products.filter((product) => {
        console.log('Filter is running!');
        return product.name.toLowerCase().includes(search.toLowerCase());
    });*/

    // Z wykorzystaniem useMemo
    const filteredProducts = useMemo(() =>
        products.filter((product) => {
            console.log('Filter is running!');
            return product.name.toLowerCase().includes(search.toLowerCase());
        }), [search]
    );

    return (
        <div>
            <input type="text" value={text} onChange={handleText} />
            <button type="button" onClick={handleSearch}>
                Filter products
            </button>

            <Products products={filteredProducts}/>
        </div>
    );
};

const Products = ({products}) => (
    <ul>
        {products.map((product) => <ProductItem key={product.id} product={product} />)}
    </ul>
);

const ProductItem = ({product}) => (<li>{product.name}</li>);

export default App1;

/*
    Kilka uwag odnosnie useMemo.

    1. Nie myl useMemo z memo z API React.
       useMemo służy do zapamiętywania wartości podczas gdy React.memo chroni komponent
       przed zbędnym re-rerenderingiem

    2. Nie myl useMemo z useCallback.
       useMemo sluzy do zapamiętywania wartości, useCallback sluzy do zapamiętywania funkcji

    3. useMemo nie zawsze będzie dobrym rozwiązaniem. Niekiedy więcej "wysiłku" będzie
       kosztować naszą aplikację sprawdzenie które zależności się zmieniły, a które nie
       i czy kod w useMemo ma się wykonać w danej chwili, niż po prostu gdyby jeszcze raz
       miała wykonać się optymalizowana funkcja.
*/
