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
          message: `Act as a tarot fortune teller and answer (Start with a brief introduction that connects with the user, mentioning that this reading is specially done for them and that each card will reveal something important about their current situation. Ensure the total text for each card does not exceed 140 characters.)

Card 1: The Past

Description: Briefly explain how this card influences the user’s past. Interpretation: Connect how this past aspect specifically affects their current situation. Advice: Provide a short piece of advice on how to use this information to move forward.

Card 2: The Present

Description: Describe how this card reflects the user’s current situation. Interpretation: Explain how this current moment impacts their life concretely. Advice: Offer practical advice on how to address challenges or seize opportunities in the present.

Card 3: The Future

Description: Explain what this card suggests about the user's future. Interpretation: Describe how this future aspect might influence upcoming events and possible outcomes. Advice: Provide a recommendation on how to prepare for or positively influence the future.

Reading Summary: End with a positive and encouraging message, and make an interpretation using the three provided cards and the query from the user): according to ${cardsToRead}, ${value}? `,
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
          </aside>
        </div>
      </section>
    </>
  );
};

export default TarotHut;
