import Header from "./components/Header/Header";
import SearchWeather from "./components/SearchWeather/SearchWeather";

 

function App() {
	const handleOnSearchChange = (city) => {
		console.log(city);
	};
	
	return (
		<div className="App">
			<Header />
			<SearchWeather onSearchChange={handleOnSearchChange} />
		</div>
	);
}

export default App;
