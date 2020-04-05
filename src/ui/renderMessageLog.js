import React from 'react';
import ReactDOM from 'react-dom';
import {constants} from '../lib/constants';
import {colors} from './colors';

const renderMessageLog = function(messageLogMount, messages) {
  ReactDOM.render(
    <MessageLog
      messages={messages}
    />,
    messageLogMount
  );
}

const LOG_ROWS = 6;
const LOG_HEIGHT = LOG_ROWS * constants.CELL_HEIGHT;
const LOG_WIDTH = constants.MAP_WIDTH * constants.CELL_WIDTH;

class MessageLog extends React.Component {
  constructor(props) {
    super(props);
    this.ulRef = React.createRef();
  }
  componentDidUpdate() {
    this.ulRef.current.scrollTop = 99999999999;
  }
  render() {
    return (
      <div className='messageLog' style={styles.messageLog}>
        <ul ref={this.ulRef} style={styles.ul}>
          {this.props.messages.map( (message, i) =>
            <Message
              key={i}
              {...message}
            />   
          )}
        </ul>
      </div>
    );
  }
}

const Message = ({ text, color }) => (
  <li style={{ color: color }}>
    {text}
  </li>
);

const styles = {
  messageLog: {
    background: colors.BLACK,
    width: LOG_WIDTH,
    height: LOG_HEIGHT,
    marginTop: '-2px',
    display: 'flex',
    flexDirection: 'column',
  },
  ul: {
    listStyle: 'none',
    overflow: 'auto',
    paddingLeft: '4px',
  },
};

export {renderMessageLog};