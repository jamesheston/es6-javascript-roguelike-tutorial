import {colors} from '../ui/colors';

export class Message {
  constructor(text, color=colors.WHITE) {
    this.text = text;
    this.color = color;
  }
};

export class MessageLog {
  constructor( messages = [] ) {
    this.messages = [];
  }

  add(message) {
    this.messages.push( new Message(message.text, message.color) );
  }
};