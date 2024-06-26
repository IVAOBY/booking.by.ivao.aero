import QrCode from "qrcode.react";
import { FunctionComponent, ReactNode } from "react";
import bodyStyle from "./board-pass-body.module.css";
import headerStyle from "./boarding-pass-header.module.css";
import { IoAirplaneOutline } from "react-icons/io5";

export enum BoardingPassType {
  DEPARTURE,
  ARIVAL,
}

interface BoardingPassProps {
  themeColor?: string;
  user: {
    firstName: string;
    lastName: string;
    vid: string;
  };
  origin: {
    name: string;
    iata: string;
  };
  destination: {
    name: string;
    iata: string;
  };
  callsign: string;
  slotDate: string;
  gate: string;
  type: BoardingPassType;
  eventStartDate: Date;
  actions?: ReactNode;
}

const defaultThemeColor = "#0d2c99";

const formatDate = (date: Date) => {
  const months = [
    "JAN",
    "FEV",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OUT",
    "NOV",
    "DEC",
  ];

  const day = date.getUTCDate();
  const month = date.getUTCMonth();
  const year = date.getUTCFullYear();

  return [
    day.toString().padStart(2, "0"),
    months[month],
    year.toString().substring(2),
  ].join(" ");
};

const BoardingPassHeader: FunctionComponent<BoardingPassProps> = ({
  themeColor = defaultThemeColor,
  actions
}) => {
  return (
    <header
      style={{ backgroundColor: themeColor }}
      className={headerStyle.header}
    >
      <div>
        <span>Boarding pass</span>
        <span>Пасадачны талон</span>
      </div>
      <div>
        {actions}
      </div>
    </header>
  );
};

const BoardingPassLeftSide: FunctionComponent<BoardingPassProps> = ({
  themeColor = defaultThemeColor,
  user,
  callsign,
  origin,
  destination,
  gate,
  slotDate,
  eventStartDate,
  type,
}) => {
  return (
    <div>
      <div className={bodyStyle.passengerInfo}>
        <span>
          <span>Pilot / Пілот</span>
          <span>
            {user.lastName}, {user.firstName}
          </span>
        </span>

        <span>
          <span>PNR code / Код браніравання</span>
          <span>{user.vid}</span>
        </span>
      </div>

      <div
        style={{ backgroundColor: themeColor, color: themeColor }}
        className={bodyStyle.flightHeader}
      >
        <span>from / з</span>
        <span>Career flight / Перавозчык</span>
        <span>To / Да</span>
      </div>
      <div className={bodyStyle.flightInfo}>
        <div className="flex flex-col">
          <div className="font-action font-semibold">
            {origin.name}/{origin.iata}
          </div>
          <div className="font-header mt-auto">
            <div className="font-light text-[0.56rem] leading-3">Date / Дата</div>
            <div className="text-sm">{formatDate(eventStartDate)}</div>
          </div>
          <div className="font-header mt-auto">
            <div className="font-light text-[0.56rem] leading-3">stand / Стаянка</div>
            <div className="text-[2rem] leading-[2.6rem] font-extrabold">{gate}</div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="font-action font-semibold">
            {callsign}
          </div>
          <div className="font-header mt-auto">
            <div className="font-light text-[0.56rem] leading-3">Group / Група</div>
            <div className="text-sm">G1</div>
          </div>
          <div className="font-header mt-auto">
            <div className="font-light text-[0.56rem] leading-3">
              {type === BoardingPassType.DEPARTURE ? "EOBT(UTC)" : "ETA(UTC)"}
            </div>
            <div className="text-[2rem] leading-[2.6rem] font-extrabold">{slotDate}</div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="font-action font-semibold">
            {destination.name}/{destination.iata}
          </div>
          <div className={bodyStyle.qrCodeInfo}>
            <div className={bodyStyle.infoText}>
              Для ўдзелу ў мерапрыемстве неабходна ведаць і
              выконваць усе рэкамендацыі, даступныя на брыфінгу пілота
            </div>

            <QrCode value="https://br.ivao.aero" size={76} renderAs="svg" />
          </div>
        </div>
      </div>
    </div>
  );
};

const BoardingPassRightSide: FunctionComponent<BoardingPassProps> = ({
  user,
  origin,
  callsign,
  destination,
  slotDate,
  type,
  eventStartDate
}) => {
  return (
    <div className={bodyStyle.sideContent}>
      <div className={bodyStyle.passengerInfoSideBar}>
        <div>Pilot / Пілот</div>
        <div>
          {user.lastName}, {user.firstName}
        </div>
      </div>
      <div className={bodyStyle.flightInfoSidebar}>
        <div>{origin.iata}</div>
        <div>
          <div>
            <IoAirplaneOutline size={17} />
          </div>
          <div>{callsign}</div>
        </div>
        <div>{destination.iata}</div>
      </div>
      <div className={bodyStyle.dateInfoSidebar}>
        <div>
          <div>Date / Дата</div>
          <div>{formatDate(eventStartDate)}</div>
        </div>
        <div>
          <div>
            {type === BoardingPassType.DEPARTURE ? "EOBT(UTC)" : "ETA(UTC)"}
          </div>
          <div className="text-right">{slotDate}</div>
        </div>
      </div>
      <div className={bodyStyle.seatInfo}>
        <div>
          <div>Group / Група</div>
          <div>G1</div>
        </div>
        <div>
          <div>Seat / Месца</div>
          <div className="text-right">1A</div>
        </div>
      </div>
    </div>
  );
};

export const BoardingPass: FunctionComponent<BoardingPassProps> = (props) => {
  return (
    <section style={{ minWidth: "976px" }}>
      <BoardingPassHeader {...props} />

      <main className={bodyStyle.body}>
        <BoardingPassLeftSide {...props} />
        <BoardingPassRightSide {...props} />
      </main>
    </section>
  );
};
