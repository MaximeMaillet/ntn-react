import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage, injectIntl} from "react-intl";
import {Field} from "react-final-form";
import ReleaseDate from "../../Torrents/ReleaseDate/ReleaseDate";
import Runtime from "../../Torrents/Runtime/Runtime";
import SelectCreatableInput from "./SelectCreatableInput";
import TextInput from "./TextInput";
import NumberInput from "./NumberInput";
import DateInput from "./DateInput";

class MetaSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemSelected: props.selected,
    };
  }

  static propTypes = {
    options: PropTypes.array.isRequired,
  };

  onSelect = (index) => {
    this.props.form.change('selected', index);
    this.setState({itemSelected: index});
  };

  render() {
    const {itemSelected} = this.state;
    const {options} = this.props;
    if(!options) {
      return null;
    }

    return (
      <div className="form-input input-meta">
        {
          options.map((option, key) => {
            return (
              <Field key={key} name={`meta[${key}]`}>
                {
                  (props) => {
                    return <MetaItem
                      {...props}
                      selected={itemSelected === key}
                      select={() => this.onSelect(key)}
                    />
                  }
                }
              </Field>
            );
          })
        }
      </div>
    );
  }
}

class MetaItem extends Component {
  static DISPLAY = {
    FORM: 1,
    THUMBNAIL: 2,
  };

  constructor(props) {
    super(props);
    this.state = {
      display: props.display || MetaItem.DISPLAY.THUMBNAIL
    };
  }

  switchDisplay = (display) => {
    this.setState({display});
  };

  render() {
    const {input} = this.props;
    if(this.state.display === MetaItem.DISPLAY.THUMBNAIL) {
      return <MetaThumbnailInput
        {...this.props}
        switchDisplay={() => this.switchDisplay(MetaItem.DISPLAY.FORM)}
        option={input.value}
      />;
    }

    return <MetaEditInput
      {...this.props}
      switchDisplay={() => this.switchDisplay(MetaItem.DISPLAY.THUMBNAIL)}
    />
  }
}

class MetaThumbnailInput extends Component {
  render() {
    const {selected, option} = this.props;
    return (
      <div className={`input-meta-item item-thumbnail ${selected ? 'active' : ''}`}>
        <div className="meta-details">
          <div className="meta-poster" style={{
            backgroundImage: `url('${option.poster}')`
          }} />
          <div className="data">
            <div className="header">
                  <span className={`media-type-badge ${option.media_type}`}>
                    {option.media_type === 'tv' && <FormattedMessage id="form.meta.media_type.tv_show" />}
                    {option.media_type === 'movie' && <FormattedMessage id="form.meta.media_type.movie" />}
                  </span>
              <button className="btn btn-primary" onClick={this.props.switchDisplay}><i className="fa fa-edit" /></button>
            </div>
            <div className="title">{option.title}</div>
            <div className="details">
              <ReleaseDate date={option.release_date} />&nbsp;
              <Runtime runtime={option.runtime} />
            </div>
            <div className="genres">
              {
                (option.genres && option.genres.length > 0) &&
                option.genres.map((genre, key) => {
                  return <span key={key} className="badge badge-pill badge-secondary mr-1">{genre.name}</span>
                })
              }
            </div>
            <div className="overview">
              {option.overview.length > 150 ?
                `${option.overview.substring(0, 150)}...`
                :
                option.overview
              }
            </div>
          </div>
        </div>
        <div className="d-flex btn-choose">
          <button type="button" onClick={this.props.select} className="btn btn-primary">
            <FormattedMessage id="form.meta.button.choose"/>
          </button>
        </div>
      </div>
    );
  }
}

class MetaEditInput extends Component {
  render() {
    const {input, selected} = this.props;
    return (
      <div className={`input-meta-item item-edit ${selected ? 'active' : ''}`}>
        <TextInput
          name={`${input.name}.title`}
          placeholder="Title"
          required
        />

        <TextInput
          name={`${input.name}.media_type`}
          placeholder="Mediat type"
          required
        />

        <TextInput
          name={`${input.name}.language`}
          placeholder="Language"
        />

        <TextInput
          name={`${input.name}.overview`}
          placeholder="Overview"
        />

        <TextInput
          name={`${input.name}.poster`}
          placeholder="Poster url"
        />

        <DateInput
          name={`${input.name}.release_date`}
          placeholder="Release date"
        />

        <NumberInput
          name={`${input.name}.runtime`}
          placeholder="Runtime"
        />

        <SelectCreatableInput
          name={`${input.name}.genres`}
          multiple
          options={input.value.genres.map(g => ({label: g.name, value: g.id}))}
          transformValue={(v) => v.map((v) => ({label:v.name, value:v.id}))}
        />

        <button className="btn btn-primary" onClick={this.props.switchDisplay}>
          Ok
        </button>
      </div>
    );
  }
}

MetaSelect.defaultProps = {
  className: '',
  required: false,
};

MetaSelect.propTypes = {
  // label: PropTypes.string.isRequired,
  // name: PropTypes.string.isRequired,
  // className: PropTypes.string,
  // placeholder: PropTypes.string,
  // required: PropTypes.bool,
};

export default injectIntl(MetaSelect);