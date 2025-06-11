import type { FC } from "react";
import DOMPurify from "dompurify";

interface FeedbackProps {
  id: number;
  text: string;
}

const Feedback: FC<FeedbackProps> = ({ id, text }) => {
  const cleanHTML = DOMPurify.sanitize(text);

  return (
    <div className="flex flex-col bg-[#D9D9D9] rounded-2xl p-5">
      <h1 className="text-black text-2xl">Отзыв {id}</h1>
      <p
        className="text-black text-2xl"
        dangerouslySetInnerHTML={{ __html: cleanHTML }}
      ></p>
    </div>
  );
};

export default Feedback;
