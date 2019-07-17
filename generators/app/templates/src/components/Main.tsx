import "./Main.css";
import * as React from "react";

export interface MainProps {
    text: string;
}
  export interface MainState {
    enabled: boolean;
}

export class Main extends React.Component<MainProps, MainState> {
  constructor(props: MainProps) {
    super(props);
    this.state = {
      enabled: true
    };
  }
  
  render() {
    return (
      <div>
        {this.state.enabled &&
        <p>{this.props.text}</p>
        }
      </div>
    );
  }
}