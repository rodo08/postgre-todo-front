import { useEffect, useState } from "react";
import { Back } from "../components/Icons";
import { useNavigate } from "react-router-dom";
import MarkdownIt from "markdown-it";
import tarotCards from "../cards";

const TarotHut = () => {
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [selectedCardKeywords, setSelectedCardKeywords] = useState([]);
  const md = new MarkdownIt();
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/menu");
  };

  ////gemini
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [answer, setAnswer] = useState("");

  const clear = () => {
    setValue("");
    setError("");
    setAnswer("");
    setRandomNumbers([]);
    setSelectedCards([]);
    setSelectedCardKeywords([]);
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
          message: `Act as a tarot reader and provide a personalized 3 cards reading: Cardrd 1: The Past, Card 2: The Present and Card 3: The Future. If the query meaning is not a clear question or sentence, respond with "The cards shows me nothing about this..."

Reading Summary: Conclude by weaving together the insights from all three cards, directly answering the user’s question. Sum up how their past, present, and future align according to the cards, and provide a clear, cohesive response either good or bad possible outcome): according to ${cardsToRead}, ${value}?`,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/gemini`,
        options
      );
      const data = await response.text();
      const formattedAnswer = md.render(data);
      setAnswer(formattedAnswer);
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
            <li className="flex shadow-none">
              <div className="flex gap-4 items-center pb-4">
                <Back
                  className="w-fit-content bg-[#ba94ff] rounded cursor-pointer"
                  onClick={goBack}
                />
                <h2>Tarot</h2>
              </div>
            </li>
            <li className="shadow-none">
              {selectedCards.length > 0 ? (
                <h2 className="highlight">Your cards have been revealed...</h2>
              ) : (
                <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4">
                  <label htmlFor="" className="highlight font-bold text-2xl">
                    Make your query
                  </label>
                  <input
                    type="text"
                    placeholder="Your question here"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="w-full md:w-fit"
                  />
                  <button className="w-full md:w-fit" onClick={shuffleCards}>
                    Get your cards
                  </button>
                </div>
              )}
            </li>
            <li className="shadow-none">
              <div className="flex justify-center py-4 ">
                {!selectedCards.length > 0 ? (
                  <ul className="grid grid-cols-3 gap-4 mb-4">
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
                  <div className="grid grid-cols-3 gap-4 mb-4">
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
          {selectedCards.length > 0 ? (
            <aside>
              <p className="pb-8">
                <strong>Click a card to see its keywords: </strong>
                <span className="highlight">{selectedCardKeywords}</span>
              </p>
              {!answer && (
                <button
                  className="w-full background-[#ba94ff]"
                  onClick={getResponse}
                >
                  Get your reading
                </button>
              )}
              <section className="max-w-2xl flex flex-col gap-4 pt-8">
                {error && <p>{error}</p>}
                <div className="w-full">
                  <div>
                    {isloading ? (
                      <h2>Loading...</h2>
                    ) : (
                      <div
                        className="answer"
                        dangerouslySetInnerHTML={{ __html: answer }}
                      />
                    )}
                  </div>
                </div>
              </section>

              <button className="w-full mt-8 " onClick={clear}>
                Reset & get new cards
              </button>
            </aside>
          ) : null}
        </div>
      </section>
    </>
  );
};

export default TarotHut;
