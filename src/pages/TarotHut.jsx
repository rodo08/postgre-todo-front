import { useEffect, useState } from "react";
import tarotCards from "../cards";

const TarotHut = () => {
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [selectedCardKeywords, setSelectedCardKeywords] = useState([]);

  ////gemini
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [answer, setAnswer] = useState("");

  const clear = () => {
    setValue("");
    setError("");
  };

  const getResponse = async () => {
    setIsLoading(true);
    const cardsToRead = selectedCards.map((card) => card.name).join(", ");

    if (!value) {
      setError("Please enter a question");
      return;
    }
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          message: `Act as tarot reader: according to ${cardsToRead}, ${value}`,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch("http://localhost:8000/gemini", options);
      const data = await response.text();
      setAnswer(data);
      setValue("");
    } catch (error) {
      console.log(error);
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  ///////////////////////////////////////

  const cardDeck = tarotCards.cards.map((item) => ({
    name: item.name,
    number: item.number,
    arcana: item.arcana,
    img: item.img,
    fortune_telling: item.fortune_telling,
    keywords: item.keywords,
  }));

  const generateRandomNumber = () => {
    let number;
    do {
      number = Math.floor(Math.random() * 78) + 1;
    } while (randomNumbers.includes(number));
    return number;
  };

  useEffect(() => {
    if (randomNumbers.length < 3) {
      const newNumber = generateRandomNumber();
      setRandomNumbers((prevNumbers) => [...prevNumbers, newNumber]);
    }
  }, [randomNumbers]);

  const cardHandler = (card) => {
    const formattedKeywords =
      card.keywords
        .map((keyword) => keyword.charAt(0).toUpperCase() + keyword.slice(1))
        .join(", ") + ".";
    setSelectedCardKeywords(formattedKeywords);
  };

  const shuffleCards = () => {
    try {
      if (value !== "") {
        setSelectedCards(randomNumbers.map((index) => cardDeck[index - 1]));
        setRandomNumbers([]);

        console.log(value);
      } else {
        alert("Please enter a question first");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="w-fit flex flex-col md:flex-row gap-10">
        <div className="flex flex-col">
          <ul className="max-w-2xl">
            <li className="shadow-none">
              <h1>Tarot</h1>
            </li>
            <li className="shadow-none">
              <div className="w-full flex justify-between items-center gap-4">
                <label htmlFor="" className="highlight font-bold text-2xl">
                  Make your query
                </label>
                <input
                  type="text"
                  placeholder="Your question here"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
                <button className="w-fit" onClick={shuffleCards}>
                  Get your cards
                </button>
              </div>
            </li>
            <li className="shadow-none">
              <div className="flex justify-center py-4 ">
                {!selectedCards.length > 0 ? (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    <li>
                      <img src={tarotCards.blank} alt="" />
                    </li>
                    <li>
                      <img src={tarotCards.blank} alt="" />
                    </li>
                    <li>
                      <img src={tarotCards.blank} alt="" />
                    </li>
                  </ul>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    {selectedCards.map((card, i) => (
                      <div key={i}>
                        <img
                          src={card.img}
                          alt={card.name}
                          className="cursor-pointer"
                          onClick={() => cardHandler(card)}
                        />
                        <span>{card.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </li>
          </ul>
          <aside>
            <h3 className="highlight font-bold text-2xl">Card description</h3>
            <p className=" pb-4">
              Click a card to see its keywords:{" "}
              <span className="highlight">{selectedCardKeywords}</span>
            </p>
            <button className="w-fit" onClick={getResponse}>
              Get your reading
            </button>
            <section className="max-w-2xl flex flex-col gap-4 pt-8">
              {/* <button
              className="surprise w-fit"
              onClick={surprise}
              disabled={!chatHistory}
            >
              Surprise me
            </button> */}

              {/* <div className="input-container flex gap-4">
              <input
                value={value}
                type="text"
                placeholder="when is x-mas?"
                onChange={(e) => setValue(e.target.value)}
              />
              {!error && <button onClick={getResponse}>Ask</button>}
              {error && <button onClick={clear}>Clear</button>}
            </div> */}
              {error && <p>{error}</p>}
              <div className="w-full">
                <div>
                  {isloading ? (
                    <h2>Loading...</h2>
                  ) : (
                    <p className="answer">{answer}</p>
                  )}
                </div>
              </div>
            </section>
          </aside>
        </div>
      </section>
    </>
  );
};

export default TarotHut;
