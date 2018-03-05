import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';

class Pagination extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageNums: [],
      visiblePageNums: [],
      page: parseInt(sessionStorage.getItem('currentPage'), 10),
      location: sessionStorage.getItem('currentLocation'),
      center: 3
    }

    this.shiftLeft = this.shiftLeft.bind(this);
    this.shiftRight = this.shiftRight.bind(this);
    this.setVisiblePageNums = this.setVisiblePageNums.bind(this);
  }

  componentDidMount() {
    const pageNums = [];
    for (let i=1; i<=this.props.pages; i++) {
      pageNums.push(i);
    }

    this.setState({
      pageNums
    });

    this.setVisiblePageNums(this.state.page, pageNums);
  }

  shiftLeft(e) {
    e.preventDefault();
    let newCenter = this.state.center - 5;
    this.setVisiblePageNums(newCenter, this.state.pageNums);
  }

  shiftRight(e) {
    e.preventDefault();
    let newCenter = this.state.center + 5;
    this.setVisiblePageNums(newCenter, this.state.pageNums);
  }

  setVisiblePageNums (newCenter, pageNums) {
    let visiblePageNums;
    let center;

    if (newCenter <= 2) {
      visiblePageNums = pageNums.slice(0, 5);
      center = 3;
    } else if (newCenter > this.props.pages - 2) {
      visiblePageNums = pageNums.slice(this.props.pages-5);
      center = this.props.pages - 2;
    } else {
      visiblePageNums = pageNums.slice(newCenter-3, newCenter+2);
      center = newCenter;
    }

    this.setState({
      visiblePageNums, 
      center
    })
  }

  render() {
    return (
      <div className="pagination">
        <FlatButton 
          label={<i className="fas fa-angle-double-left"></i>}
          href={`/search?location=${this.state.location}&page=1`}
          className="pagination__button"
          labelStyle={{padding: '0 0.8em'}}
          disabled={this.state.page===1}
        />
        <FlatButton 
          label={<i className="fas fa-angle-left"></i>}
          onClick={this.shiftLeft}
          className="pagination__button"
          labelStyle={{padding: '0 0.8em'}}
          disabled={this.state.center<=3}
        />
        {this.state.visiblePageNums.map(num => 
          <FlatButton 
            key={num}
            label={num} 
            href={`/search?location=${this.state.location}&page=${num}`}
            className={`pagination__button${num===this.state.page ? ' pagination__button_active' : ''}`}
            labelStyle={{padding: '0 0.8em'}}
            disabled={num===this.state.page}
          />
        )}
        <FlatButton 
          label={<i className="fas fa-angle-right"></i>}
          onClick={this.shiftRight}
          className="pagination__button"
          labelStyle={{padding: '0 0.8em'}}
          disabled={this.state.center>=this.props.pages-2}
        />
        <FlatButton 
          label={<i className="fas fa-angle-double-right"></i>}
          href={`/search?location=${this.state.location}&page=${this.props.pages}`}
          className="pagination__button"
          labelStyle={{padding: '0 0.8em'}}
          disabled={this.state.page===this.props.pages}
        />
      </div>
    );
  }
}

export default Pagination;