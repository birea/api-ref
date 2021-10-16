import React, { useState, useEffect } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import IndexTable from "../components/tradingChart/IndexTable";
import CandleChart from "../components/tradingChart/CandleChart";
import OrderBook from "../components/tradingChart/OrderBook";
import DepthChart from "../components/tradingChart/DepthChart";

const TradingChart = () => {
  const [constituents, setConstituents] = useState([]);
  const [book, setBook] = useState(undefined);
  const [bufferedData, setBufferedData] = useState([]);
  const [pairBase, setPairBase] = useState("BTC");
  const [pairQuote, setPairQuote] = useState("USDT");
  const [pairs, setPairs] = useState(undefined);
  const [passSocket, setPassSocket] = useState(undefined);
  const [candleData, setCandleData] = useState([]);
  const candleInterval = "1m";
  const lastCandle = undefined;
  const candleAmount = 100;
  const bookAmount = 100;

  //----------------------HDAI Index-----------------------------------

  const createPairs = (json) => {
    let pairsData = [];
    for (const asset in json.constituents) {
      let assetId = json.constituents[asset].assetId;
      if (assetId === "BTC") {
        pairsData.push({ base: "BTC", quote: "USDT" });
      } else {
        pairsData.push({ base: assetId, quote: "BTC" });
      }
    }
    setPairs(pairsData);
  }

  const fetchIndex = () => {
    const query = "https://api.hashdex.io/prod/marketdata/v1/index/HDAI/last";
    fetch(query, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    })
      .then((response) => response.json())
      .then((json) => {
        createPairs(json);
        setConstituents(json.constituents);
      });
  }

  //-------------------OrderBook----------------------------------

  const getSnapshot = () => {
    const query =
      "https://api.binance.com/api/v3/depth?symbol=" +
      pairBase +
      pairQuote +
      "&limit=" +
      bookAmount;
    fetch(query, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    })
      .then((response) => response.json())
      .then((json) => {
        setBook(json);
      });
  }

  // const flushBufferedData = () => {
  //   for (const data in bufferedData) {
  //     updateBook(bufferedData[data]);
  //   }
  //   setBufferedData([]);
  // }

  const bufferUpdateData = (parsedData) => {
    let newBufferedData = bufferedData.push(parsedData);
    setBufferedData(newBufferedData);
  }

  const mergeQuotes = (orig, up, type) => {
    //Merges the current book with the updates

    //Starts from the beginning of each array, adding the smallest one "up next"
    //If there's a tie, it adds the updated data

    //It's ugly but works, will refactor if I have time
    let iorig = 0;
    let iup = 0;
    let newarr = [];
    while (
      iorig < orig.length &&
      iup < up.length &&
      newarr.length < bookAmount
    ) {
      if (
        (orig[iorig][0] < up[iup][0] && type === "ask") ||
        (orig[iorig][0] > up[iup][0] && type === "bid")
      ) {
        newarr.push(orig[iorig]);
        iorig++;
      } else if (orig[iorig][0] === up[iup][0]) {
        if (up[iup][1] !== 0) {
          newarr.push(up[iup]);
        }
        iorig++;
        iup++;
      } else {
        if (up[iup][1] !== 0) {
          newarr.push(up[iup]);
        }
        iup++;
      }
    }
    for (; iorig < orig.length; iorig++) {
      if (newarr.length >= bookAmount) {
        break;
      }
      newarr.push(orig[iorig]);
    }
    for (; iup < up.length; iup++) {
      if (newarr.length >= bookAmount) {
        break;
      }
      newarr.push(up[iup]);
    }
    return newarr;
  }

  //The Sanity Check Functions make sure there is no bid higher than the newest ask, and vice versa
  const sanityCheckAsk = (askArray, bid) => {
    let i;
    for (i = 0; i < askArray.length; i++) {
      if (askArray[i][0] < bid[0]) {
        //Something's wrong
      } else {
        break;
      }
    }
    askArray.splice(0, i);
    return askArray;
  }

  const sanityCheckBid = (bidArray, ask) => {
    let i;
    for (i = 0; i < bidArray.length; i++) {
      if (bidArray[i][0] > ask[0]) {
        //Something's wrong
      } else {
        break;
      }
    }
    bidArray.splice(0, i);
    return bidArray;
  }

  const updateBook = (updateData) => {
    if (updateData["s"] === pairBase + pairQuote) {
      const newAskArray = mergeQuotes(
        book.asks,
        updateData.a,
        "ask"
      );
      const checkedAskArray = sanityCheckAsk(newAskArray, updateData.b[0]);
      const newBidArray = mergeQuotes(
        book.bids,
        updateData.b,
        "bid"
      );
      const checkedBidArray = sanityCheckBid(newBidArray, updateData.a[0]);
      let newbook = book;
      newbook.asks = checkedAskArray;
      newbook.bids = checkedBidArray;
      setBook(newbook);
    }
  }

  //------------------CandleChartData-----------------------------

  const getInitialCandleData = () => {    
    const query =
      "https://api.binance.com/api/v3/klines?symbol=" +
      pairBase +
      pairQuote +
      "&interval=" +
      candleInterval +
      "&limit=" +
      candleAmount;
    fetch(query, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    })
      .then((response) => response.json())
      .then((json) => {
        parseCandleData(json);
      });
  }
  const parseCandleData = (json) => {    
    let candleDataInfo = [];
    for (const dataPoint in json) {
      candleDataInfo.push(dataPointToCandlePoint(json[dataPoint]));
    }
    setCandleData(candleDataInfo)
  }

  const dataPointToCandlePoint = (dataPoint) => {
    let timeStamp = (dataPoint[0] + dataPoint[6] + 1) / 2;
    let candle = dataPoint.slice(1, 5);
    return [timeStamp, candle];
  }

  const updateCandleData = (json) => {
    let currentCandles = candleData;
    let lastCandle = currentCandles.slice(-1)[0];
    let timeStamp = (json.k.T + json.k.t + 1) / 2;
    let newCandle = [json.k.o, json.k.h, json.k.l, json.k.c];
    let newCandlePoint = [timeStamp, newCandle];
    if (lastCandle[0] === timeStamp) {
      currentCandles.pop();
      currentCandles.push(newCandlePoint);
    } else {
      currentCandles.shift();
      currentCandles.push(newCandlePoint);
    }
    setCandleData(currentCandles);
  }

    //--------------------WSS Calls------------------------------

  const socketCall = () => {
    //https://stackoverflow.com/questions/59855853/unable-to-get-the-socket-data-through-binance-websockets
    const ws = new WebSocket("wss://stream.binance.com:9443/ws");
    const param1 =
      pairBase.toLowerCase() +
      pairQuote.toLowerCase() +
      "@depth";
    const param2 =
      pairBase.toLowerCase() +
      pairQuote.toLowerCase() +
      "@kline_" +
      candleInterval;

    var msg = {
      method: "SUBSCRIBE",
      params: [param1, param2],
      id: 1
    };

    ws.onopen = () => {
      ws.send(JSON.stringify(msg));
    };

    ws.onmessage = (e) => {
      const parsedData = JSON.parse(e.data);
      if (parsedData.e === "depthUpdate") {
        if (book === undefined) {
          bufferUpdateData(parsedData);
        } else {
          updateBook(parsedData);
        }
      } else if (parsedData.e === "kline") {
        updateCandleData(parsedData);
      }
    };
    setPassSocket(ws);
  }

  const socketClose = () => {
    var wss = passSocket;
    wss.close();
  };

  //-------------------Lifecycle Methods----------------------------

  useEffect(() => {
    fetchIndex();
    socketCall();
    getSnapshot();
    getInitialCandleData();

    return () => {
      socketClose();
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  //-------------------Dropdown---------------------------
  const changePair = (pair) => {
    setPairBase(pair.base);
    setPairQuote(pair.quote);
    socketClose();
    socketCall();
    getSnapshot();
    getInitialCandleData();
  }

  const getMenuItems = () => {
    let menu = [];
    for (let pair in pairs) {
      menu.push(
        <Dropdown.Item key={pair} onClick={() => changePair(pairs[pair])}>
          {pairs[pair].base}/{pairs[pair].quote}
        </Dropdown.Item>
      );
    }
    return menu;
  }

  const getDropdown = () => {
    return (
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {pairBase}/{pairQuote}
        </Dropdown.Toggle>

        <Dropdown.Menu>{getMenuItems()}</Dropdown.Menu>
      </Dropdown>
    );
  }

  //-------------------------------Rendering---------------------

  return (
    <div className="App">
      <Container fluid>
        <Row className="align-items-center justify-content-sm-center">
          <Col sm="auto">
            <h1>HDAI DashBoard</h1>
          </Col>
          <Col sm="auto">{getDropdown()}</Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col xs={12}>
            <CandleChart
              candleData={candleData}
              lastCandle={lastCandle}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            {book === undefined ? (
              "Loading"
            ) : (
              <DepthChart book={book} />
            )}{" "}
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <IndexTable constituents={constituents} />
          </Col>
          <Col xs={12} md={6}>
            <OrderBook book={book} quote={pairQuote} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TradingChart;