import React, { Component } from 'react';
import classNames from 'classnames';
import { convertDyadicArray, getDateList, dateFormat } from './utils';

interface IState {
  year: number;
  month: number;
  activeDate: string;
  today: string;
  list: Array<any>;
}

interface IProps {
  value: string;
  onSelect: (v: string) => void;
  minDate: string;
  maxDate: string;
  locale: string;
}

export default class CalendarContent extends Component<IProps, IState> {
  static defaultProps = {
    onSelect() {},
    value: '',
    minDate: '1993/01/01',
    maxDate: '2030/02/01',
    locale: 'en',
  };

  constructor(props: IProps) {
    super(props);
    const now = props.value ? new Date(props.value) : new Date();
    const today = dateFormat(now);
    const year = +today.slice(0, 4);
    const month = +today.slice(5, 7);
    const dateList: any = getDateList(year, month);
    const list = convertDyadicArray(dateList, 6);
    const activeDate = today;

    this.state = {
      year,
      month,
      activeDate,
      today,
      list,
    };
  }

  shouldComponentUpdate(nextProps: any, nextState: any) {
    return !(
      this.state.year === nextState.year &&
      this.state.month === nextState.month &&
      this.state.activeDate === nextState.activeDate
    );
  }

  handleIncreaseMonth = () => {
    // 当月 new Date(this.state.year, this.state.month -1)
    const nextMonth = new Date(this.state.year, this.state.month);
    const year = nextMonth.getFullYear();
    const month = nextMonth.getMonth() + 1;
    const dateList: any = getDateList(year, month);
    const list = convertDyadicArray(dateList, 6);

    this.setState({ year, month, list });
  };

  handleReduceMonth = () => {
    const lastMonth = new Date(this.state.year, this.state.month - 2);
    const year = lastMonth.getFullYear();
    const month = lastMonth.getMonth() + 1;
    const dateList: any = getDateList(year, month);
    const list = convertDyadicArray(dateList, 6);

    this.setState({ year, month, list });
  };

  handleSelectDate = (e: any) => {
    const el = e.target;
    if (el.nodeName === 'SPAN' && el.className.indexOf('item-disable') === -1) {
      const activeDate = el.getAttribute('data-date');
      this.props.onSelect(activeDate);
      const month = +activeDate.slice(5, 7);
      const year = +activeDate.slice(0, 4);

      if (this.state.activeDate !== activeDate) {
        if (this.state.month !== month) {
          const dateList: any = getDateList(year, month);
          const list = convertDyadicArray(dateList, 6);
          this.setState({ year, month, activeDate, list });
        } else {
          this.setState({ activeDate });
        }
      }
    }
  };

  getClassName(dateItem: any) {
    const { year, month, today, activeDate } = this.state;
    let className;
    const strYM = month < 10 ? `${year}/0${month}` : `${year}/${month}`;
    const { minDate, maxDate } = this.props;
    if (dateItem.indexOf(strYM, 0) === -1) {
      className = dateItem === today ? 'item-light item-today' : 'item-light';
    } else {
      if (dateItem === activeDate) {
        className =
          dateItem === today ? 'item-active item-today' : 'item-active';
      } else {
        className = dateItem === today ? 'item-today' : null;
      }
    }
    if (minDate > dateItem || maxDate < dateItem) {
      className =
        dateItem === today ? 'item-disable item-today' : 'item-disable';
    }

    return className;
  }

  renderHeader() {
    const { year, month } = this.state;
    const { locale } = this.props;
    const monthEn = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    return (
      <div className="calendar-header">
        <img
          className="icon-left"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAQCAYAAAAvf+5AAAAAAXNSR0IArs4c6QAAAH9JREFUKBXV0U8KQEAUx3FPhA2O5nBuYMNKuYD8uY1SylKN78hKM8LOq89m3q+ZNzOOc1NKqQg5Us+WoxnSqxBjM+Z0CA1GpH8KBQxco4W+obFcVgUJJqywFzsl6FDCtyfpnOH+S9j6a8eJl51fhR/NPHBCAU8/j7FEZKGRYYbsVW+0LG4T/dgAAAAASUVORK5CYII="
          onClick={this.handleReduceMonth}
        />
        {locale === 'zh'
          ? `${year}年 ${month}月`
          : `${monthEn[month - 1]} ${year}`}
        <img
          className="icon-right"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAQCAYAAAAvf+5AAAAAAXNSR0IArs4c6QAAAH9JREFUKBVj+P//vwAQTwFiTgY8gAko9weIdYB4JVAxBx61DAxQU48A6U3DVTEf0GP7gXg9ELODggcX+AKUeA3E/EDMiFUR0ARWIF4BxAeBGKQQEyApOoRPEQtQEmQS5YpgbiJo0mKgdYdxugnoFVDwgLz+DogDGBkZPwJprAAABjW0SOvJenYAAAAASUVORK5CYII="
          onClick={this.handleIncreaseMonth}
        />
      </div>
    );
  }

  renderTable() {
    const weekdays =
      this.props.locale === 'en'
        ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        : ['日', '一', '二', '三', '四', '五', '六'];
    return (
      <table className="calendar-table">
        <tbody onClick={this.handleSelectDate}>
          <tr>
            {weekdays.map((w, i) => (
              <th key={w}>{w}</th>
            ))}
          </tr>
          {this.state.list.map((arr: any) => {
            return (
              <tr key={arr[0]}>
                {arr.map((value: any) => (
                  <td key={value}>
                    <span
                      data-date={value}
                      className={classNames(this.getClassName(value))}
                    >
                      {value.slice(8)}
                    </span>
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  render() {
    return (
      <div className="Calendar">
        {this.renderHeader()}
        {this.renderTable()}
      </div>
    );
  }
}
