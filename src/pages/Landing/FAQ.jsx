import { useState } from "react";
import "./FAQ.css";

const faqs = [
  {
    question: "What is StreamVerse?",
    answer:
      "StreamVerse is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries and more - on thousands of internet-connected devices.\n\nYou can watch as much as you want, whenever you want, without a single ad - all for one low monthly price. There's always something new to discover, and new TV shows and movies are added every week!",
  },
  {
    question: "How much does StreamVerse cost?",
    answer:
      "Watch StreamVerse on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹149 to ₹649/month.",
  },
  {
    question: "Where can I watch?",
    answer:
      "Watch anywhere, anytime. Sign in with your StreamVerse account to watch instantly on the web at StreamVerse.com from your personal computer or on any internet-connected device that offers the StreamVerse app, including smart TVs, smartphones, tablets, streaming media players and game consoles.\n\nYou can also download your favourite shows with the iOS or Android app. Use downloads to watch while you're on the go and without an internet connection. Take StreamVerse with you anywhere.",
  },
  {
    question: "How do I cancel?",
    answer:
      "StreamVerse is flexible. You can easily cancel your account online in two clicks. There are no cancellation fees - start or stop your account anytime.",
  },
  {
    question: "What can I watch on StreamVerse?",
    answer:
      "StreamVerse has an extensive library of feature films, documentaries, shows, anime, award-winning StreamVerse originals, and more. Watch as much as you want, anytime you want.",
  },
  {
    question: "Is StreamVerse good for kids?",
    answer:
      "The StreamVerse Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and films in their own space.\n\nKids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don't want kids to see.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="faq-section container">
      <h2>Frequently Asked Questions</h2>

      <div className="faq-container">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            faq={faq}
            isOpen={activeIndex === index}
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
          />
        ))}
      </div>
    </section>
  );
};

const FAQItem = ({ faq, isOpen, onClick }) => (
  <div className="faq-item">
    <div className="faq-question" onClick={onClick}>
      <span>{faq.question}</span>
      <span className={`plus ${isOpen ? "rotate" : ""}`}>+</span>
    </div>

    <div className={`faq-answer-wrapper ${isOpen ? "open" : ""}`}>
      <div className="faq-answer">{faq.answer}</div>
    </div>
  </div>
);

export default FAQ;
