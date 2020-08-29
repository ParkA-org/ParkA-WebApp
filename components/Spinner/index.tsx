
export default function Spinner() {
  return (
    <div className="lds-ellipsis">
      <div>
      </div>
      <div>
      </div>
      <div>
      </div>
      <div>
      </div>
      <style jsx>
        {`
        .lds-ellipsis {
          display: inline-block;
          position: relative;
          width: 110px;
          height: 110px;
        }
        .lds-ellipsis div {
          position: absolute;
          top: 33px;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: #3d907f;
          animation-timing-function: cubic-bezier(0, 1, 1, 0);
        }
        .lds-ellipsis div:nth-child(1) {
          left: 16px;
          animation: lds-ellipsis1 0.6s infinite;
        }
        .lds-ellipsis div:nth-child(2) {
          left: 16px;
          animation: lds-ellipsis2 0.6s infinite;
        }
        .lds-ellipsis div:nth-child(3) {
          left: 64px;
          animation: lds-ellipsis2 0.6s infinite;
        }
        .lds-ellipsis div:nth-child(4) {
          left: 112px;
          animation: lds-ellipsis3 0.6s infinite;
        }
        @keyframes lds-ellipsis1 {
          0% {
            transform: scale(0);
          }
          100% {
            transform: scale(1);
          }
        }
        @keyframes lds-ellipsis3 {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(0);
          }
        }
        @keyframes lds-ellipsis2 {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(48px, 0);
          }
        }
      `}
      </style>
    </div>
  )
}