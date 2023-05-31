import React from 'react'
import HubspotForm from 'react-hubspot-form'

const Waitlist = ({ data }) => (
  <div className="contact-form">
    <div className="container">
      <div className="contact-form-container ml-margins">
        <div className="contact-form-sidebar">
          <h4
            className="title-inline"
            dangerouslySetInnerHTML={{ __html: data.cloudWaitlistTitle }}
          />
          <ol className="contact-form-sidebar-list">
            {data.cloudWaitlistList.map(item => (
              <li
                className="p3"
                dangerouslySetInnerHTML={{
                  __html: item.cloudWaitlistListItem,
                }}
                key={item.cloudWaitlistListItem}
              />
            ))}
          </ol>
        </div>
        <div className="form dark-form">
          <h3>Access the Beta</h3>
          {/* <form>
              <div className="form-row">
                <div className="form-filed">
                  <label htmlFor="fname">First Name</label>
                  <input
                    type="text"
                    id="fname"
                    name="firstname"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="form-filed">
                  <label htmlFor="lname">Last Name</label>
                  <input
                    type="text"
                    id="lname"
                    name="lastname"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-filed">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-filed">
                  <label htmlFor="cname">Company Name</label>
                  <input
                    type="text"
                    id="cname"
                    name="companyname"
                    placeholder="Enter your company name"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-filed">
                  <label htmlFor="jobtitle">Job Title</label>
                  <input
                    type="text"
                    id="jobtitle"
                    name="jobtitle"
                    placeholder="What is your role?"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-filed">
                  <label htmlFor="comfort">
                    How comfortable are you or would you be self-managing
                    Meltano?
                  </label>
                  <select id="comfort" name="scomfort">
                    <option value="" disabled selected hidden>
                      Please select
                    </option>
                    <option value="comfort-1">
                      I'm currently self-managing Meltano but don't love it, and
                      would prefer Cloud
                    </option>
                    <option value="comfort-2">
                      I'm currently self-managing Meltano and am comfortable
                      with it, but am curious about Cloud
                    </option>
                    <option value="comfort-3">
                      I'm evaluating Meltano but am not interested in
                      self-managing it, and would require Cloud
                    </option>
                    <option value="comfort-4">
                      I'm evaluating Meltano and would be OK with self-managing
                      it initially, but would prefer Cloud
                    </option>
                    <option value="comfort-5">
                      I'm evaluating Meltano and would be comfortable
                      self-managing it, but am curious about Cloud
                    </option>
                  </select>
                </div>
              </div>
              <input type="submit" className="form-submit" value="Sign Up" />
            </form> */}
          <HubspotForm
            portalId="20712484"
            formId="07ef595d-2aed-4573-a6fe-c1c5873d3887"
            onSubmit={() => console.log('Submit!')}
            onReady={form => console.log('Form ready!')}
            loading={<div>Loading...</div>}
          />
        </div>
      </div>
    </div>
  </div>
)

export default Waitlist
