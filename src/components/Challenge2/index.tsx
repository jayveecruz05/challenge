import './style.scss'

import data from './data.json'

const Component = () => {
  return (
    <div id="component-2">
      {
        data.map((info) =>
          <div key={info.type} className="main-wrapper">
            <p className="info-wrapper">
              <span className="quantity">{info.quantity}</span>
              <span className="type">{info.type}</span>
            </p>

            <div className="by-country-wrapper">
              <p className="by-country-text">By Country</p>
              <div className='details-holder'>
                {
                  info['by-country'].map((details) =>
                    <p key={details.country} className={`details-wrapper ${info.type}`}>
                      <span className="quantity">{details.quantity}</span>
                      <span className="country">{details.country}</span>
                    </p>
                  )
                }
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Component
