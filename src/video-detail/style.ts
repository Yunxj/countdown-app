import styled from "@emotion/styled";
interface CountdownContainerProps {
  duration: number;
  timeRemaining: number;
}


export const CountdownContainer = styled.div<CountdownContainerProps>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
`;

export const CountdownCircle = styled.svg<CountdownContainerProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);

  circle {
    fill: none;
    stroke-linecap: round;
    stroke-width: 4;
  }

  .circle-background {
    stroke: #ffffff;
    opacity: 0; 
  }

  .circle-progress {
    stroke: #ffffff;
    stroke-dasharray: ${() => 2.3 * Math.PI * 48}; 
    stroke-dashoffset: ${({ timeRemaining }) =>
     (props) =>
        (props.timeRemaining / props.duration) * 2.3 * Math.PI * 48};
    transition: stroke-dashoffset 1s linear;
  }
`;
