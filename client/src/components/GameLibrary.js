import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import dice from "../asset/dice.jpg";
import gacha from "../asset/gacha.jpg";
import horserace from "../asset/horseracing.jpg";
import monopoly from "../asset/monopoly.jpg";
import pachinko from "../asset/pachinko.jpg";
import poker from "../asset/poker.jpg";
import slotmach from "../asset/slotmachine.jpg";
import chess from "../asset/chess.jpg";
import cachess from "../asset/cachess.jpg";
import dominos from "../asset/dominos.jpg";
import darts from "../asset/darts.jpg";
import mahjong from "../asset/mahjong.jpg";
import marbles from "../asset/marbles.jpg";
import pool from "../asset/pool.jpg";
import roulette from "../asset/roulette.jpg";
import backgammon from "../asset/backgammon.jpg";

const games = [
  { image: backgammon, name: "backgammon" },
  { image: pool, name: "pool" },
  { image: roulette, name: "roulette" },
  { image: marbles, name: "marbles" },
  { image: mahjong, name: "mahjong" },
  { image: darts, name: "darts" },
  { image: dominos, name: "dominos" },
  { image: cachess, name: "cachess" },
  { image: chess, name: "chess" },
  { image: slotmach, name: "slotmach" },
  { image: poker, name: "poker" },
  { image: pachinko, name: "pachinko" },
  { image: dice, name: "dice" },
  { image: gacha, name: "gacha" },
  { image: horserace, name: "horse-racing" },
  { image: monopoly, name: "monopoly" },
];

const GameLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [visible, setVisible] = useState(8);
  const [show, setShow] = useState(true);
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Redirect to="/signin" />;
  }

  const showMoreItems = () => {
    setVisible(16);
    setShow(!show);
  };

  const showLessitems = () => {
    setVisible(8);
    setShow(!show);
  };

  return (
    <div className="games">
      <div className="games__title">Games Library</div>
      <div className="games__search">Search for your game</div>
      <input
        className="games__search--input"
        type="text"
        placeholder="search game"
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      />
      <ul className="games__list">
        {games
          .filter((games) => {
            if (searchTerm == "") {
              return games;
            } else if (
              games.name.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return games;
            }
          })

          .slice(0, visible)
          .map((games) => {
            return (
              <li className="games__game">
                <Link to="/gamble">
                  <img
                    className="games__game--img"
                    src={games.image}
                    alt={games.name}
                  />
                  <div className="games__game--name">{games.name}</div>
                </Link>
              </li>
            );
          })}
      </ul>
      {show ? (
        <button className="games__showall" onClick={showMoreItems}>
          Show all games
        </button>
      ) : (
        <button className="games__showall" onClick={showLessitems}>
          Show less games
        </button>
      )}
    </div>
  );
};

export default GameLibrary;

/* 
things to finish:
- signup validation form (should be done)
- save playermoney to user (hard)
- fix backend  ()

*/
