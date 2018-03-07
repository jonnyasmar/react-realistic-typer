import * as React from 'react';

export interface IProps{
  message: string,
  wpm?: number,
  maxVariance?: number,
  maxPause?: number
}

export interface IState{
  keySpeed: number,
  message: string
}

/**
 * RealisticTyper
 *
 * Outputs a given message to the console character by character with artificial delays to
 *   simulate the effect of a real human typing.
 *
 * @author Jonny Asmar
 *
 * @param {string} message - The message to be typed.
 * @param {number} [wpm=160] - Target words/minute to type at.
 * @param {number} [maxVariance=.5] - The maximum percentage variance in decimal format to delay
 *   keystrokes.
 * @param {number} [maxPause=500] - The maximum pause in milliseconds to simulate when
 *   encountering non-alphabetical characters.
 */
export class RealisticTyper extends React.Component<IProps, IState>{
  static defaultProps: Partial<IProps> = {
    wpm: 160,
    maxVariance: .5,
    maxPause: 500
  };

  constructor(props: IProps){
    super(props);

    let averageWordLength = 5.1;

    this.state = {
      keySpeed: 60 / (props.wpm! * averageWordLength) * 1000,
      message: ''
    };
  }

  componentWillMount(){
    this.type(this.props.message);
  }

  componentWillReceiveProps(props: IProps){
    if(this.props.message !== props.message){
      this.setState(state => ({
        message: ''
      }));
    }
  }

  componentDidUpdate(props: IProps){
    if(props.message !== this.props.message) this.type(this.props.message);
  }

  /**
   * Resolve a Promise after a given number of milliseconds.
   *
   * @param ms {number} Milliseconds to delay Promise resolution.
   */
  static delay(ms: number){
    return new Promise((resolve: any) =>{setTimeout(resolve, ms)});
  }

  /**
   * Type the message provided during instantiation.
   *
   * @param message
   * @param i {number} - The index of the character from the message to output.
   */
  type(message: string, i: number = 0){
    if(!message) message = this.props.message;

    if(i < this.props.message.length){
      let char = this.props.message.substr(i, 1);
      let charIsSymbol = char.toLowerCase() === char.toUpperCase();

      if(char.charCodeAt(0) === 10) char = '<br/>¶<br/>';

      this.setState(state =>{
        let degreeOfVariance = Math.random() * (Math.random() > .5 ? 1 : -1);
        let pause = Math.random() > .75 && charIsSymbol ? Math.random() * this.props.maxPause! : 0;
        let delay = Math.round(this.state.keySpeed + this.state.keySpeed * this.props.maxVariance! * degreeOfVariance + pause);

        RealisticTyper.delay(delay).then(() =>{
          if(message === this.props.message) this.type(message, i + 1);
        });

        return {
          ...state,
          message: this.state.message + char
        };
      });
    }
  }

  render(){
    let message = this.state.message.split('<br/>');
    return <>
    {message.map((line: string, i: number) =>{
      if(line === '¶') return <br key={i}/>;
      else return line;
    })}
    </>
  }
}