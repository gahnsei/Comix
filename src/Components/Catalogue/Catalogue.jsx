import useDataBase from "../../utils/useDataBase";
import { useState } from "react";
import { useParams } from "react-router";
import Letter from "./Letter";

const ALPHABET = [
  `A`,
  `B`,
  `C`,
  `D`,
  `E`,
  `F`,
  `G`,
  `H`,
  `I`,
  `J`,
  `K`,
  `L`,
  `M`,
  `N`,
  `O`,
  `P`,
  `Q`,
  `R`,
  `S`,
  `T`,
  `U`,
  `V`,
  `W`,
  `X`,
  `Y`,
  `Z`
];

function Catalogue() {
  const { contentType } = useParams();
  const { dbRes } = useDataBase(`/${contentType}?orderBy=name DESC`);

  const [openLetter, setOpenLetter] = useState(`A`);

  if (contentType !== `comics` && contentType !== `characters`) {
    return <h1>404</h1>;
  }

  const changeLetter = (letter) => {
    setOpenLetter(letter);
  };

  return (
    <section className="section">
      <h1 className="section-label catalogue-label">
        {contentType.toUpperCase()}
      </h1>
      {ALPHABET.map((letter) =>
        dbRes.filter((ele) => ele.name[0] === letter)
      ).map((ele, ind) =>
        ele.length > 0 ? (
          <>
            <hr className="hr" />
            <Letter
              key={ALPHABET[ind]}
              filteredData={ele}
              changeLetter={changeLetter}
              openLetter={openLetter}
              type={contentType}
            />
          </>
        ) : (
          <></>
        )
      )}
    </section>
  );
}

export default Catalogue;
