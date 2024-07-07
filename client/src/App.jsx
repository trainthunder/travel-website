import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import iconLink from "./assets/iconLink.svg";

function App() {
  const [travelList, setTravelList] = useState([]);
  const [searchTravel, setSearchTravel] = useState("");

  const getTravelList = async (text) => {
    console.log(`http://localhost:4001/trips?keywords=${text}`);
    try {
      const result = await axios.get(
        `http://localhost:4001/trips?keywords=${text}`
      );
      console.log(result.data.data);
      setTravelList(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTravelList(searchTravel.trim());
  }, [searchTravel]);

  const handleSearch = (e) => {
    setSearchTravel(e.target.value);
  };

  const copyToClipBoard = async (copyMe) => {
    try {
      await navigator.clipboard.writeText(copyMe);
      console.log("Copied!!!");
    } catch (error) {
      console.log(error);
    }
  };

  const handleTag = (group) => {
    setSearchTravel((newgroup) => newgroup + " " + group);
  };

  return (
    <div className="flex items-center justify-center pt-[30px] flex-col w-full h-full ">
      {/* Start coding here */}
      <p className="text-[35px] text-dodgerblue">เที่ยวไหนดี</p>
      <div className="mt-[25px] w-[1000px]">
        <p className="flex items-center justify-start">ค้นหาที่เที่ยว</p>
        <input
          type="text"
          className="w-[1000px] h-[40px] outline-none border-b-[2px] border-lightgray text-center"
          placeholder="หาที่เที่ยวแล้วไปกัน ..."
          value={searchTravel}
          onChange={handleSearch}
        />
      </div>

      <div className="mt-[40px]">
        {travelList.map((list) => {
          return (
            <div className="w-[1150px] h-[250px] flex mb-[50px]">
              {/* Main Image Start */}
              <img
                src={list.photos[0]}
                alt=""
                className="w-[350px] h-[250px] rounded-3xl"
              />
              {/* Main Image End */}
              <div className="flex-1 flex-col ml-[30px] flex justify-between">
                {/* Title Part Start */}
                <p className="text-[24px]">{list.title}</p>
                {/* Title Part End */}
                {/* Description Part Start */}
                <p className="">
                  {list.description.substring(0, 100) + " " + "..."}
                </p>
                {/* Description Part End */}
                {/* Hyperlink Part Start */}
                <a
                  href={list.url}
                  className="text-dodgerblue underline"
                  target="_blank"
                >
                  อ่านต่อ
                </a>
                {/* Hyperlink Part End */}
                {/* Category Part Start */}
                <p>
                  หมวด{" "}
                  {list.tags.slice(0, -1).map((tag) => {
                    return (
                      <button
                        className="underline mr-[10px] ml-[5px]"
                        onClick={() => handleTag(tag)}
                      >
                        {tag}
                      </button>
                    );
                  })}
                  และ{" "}
                  <button
                    className="underline mr-[10px] ml-[5px]"
                    onClick={() => handleTag(list.tags[list.tags.length - 1])}
                  >
                    {list.tags[list.tags.length - 1]}
                  </button>
                </p>
                {/* Category Part End */}
                <div className="flex justify-between items-end">
                  {/* Another Image Part Start */}
                  <div className="flex gap-[30px]">
                    <img
                      src={list.photos[1]}
                      alt=""
                      className="w-[100px] h-[100px] rounded-2xl"
                    />
                    <img
                      src={list.photos[2]}
                      alt=""
                      className="w-[100px] h-[100px] rounded-2xl"
                    />
                    <img
                      src={list.photos[3]}
                      alt=""
                      className="w-[100px] h-[100px] rounded-2xl"
                    />
                  </div>
                  {/* Another Image Part End */}
                  {/* Copy URL Button Link Start */}
                  <button
                    className="w-[50px] h-[50px] bg-dodgerblue rounded-full flex items-center justify-center mr-[90px] active:ring-black active:ring-4 "
                    onClick={() => copyToClipBoard(list.url)}
                  >
                    <img src={iconLink} alt="" className="w-[30px] h-[30px]" />
                  </button>
                  {/* Copy URL Button Link End */}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
