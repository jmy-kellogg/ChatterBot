import React, { Component } from 'react';
import { render } from 'react-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import BusinessProfileInfo from './BusinessProfileInfo';
import BusinessProfileGreetingText from './BusinessProfileGreetingText';
import BusinessProfileGetStartedOption from './BusinessProfileGetStartedOption';
import BusinessProfileFacebookStaticMenuSettings from './BusinessProfileFacebookStaticMenuSettings';
import BusinessProfileHeadNodeText from './BusinessProfileHeadNodeText';

const BusinessProfilePage = React.createClass({
  handleSelect(index, last) {
    //console.log('Selected tab: ' + index + ', Last tab: ' + last);
  },
  render () {
    const businessId = this.props.params.businessId
    return (
      <div className='container businessPage'>
        <div className="row">
          <div className="col-sm-8 col-sm-offset-2">
            <Tabs onSelect={this.handleSelect}>
              <TabList>
                <Tab>General Settings</Tab>
                <Tab>Starting Settings</Tab>
                <Tab>Persistent Menu Settings</Tab>
              </TabList>
              <TabPanel>
                <br/>
                <BusinessProfileInfo data-id={businessId} />
              </TabPanel>
              <TabPanel>
                <br/>
                <BusinessProfileHeadNodeText data-id={businessId} />
                <BusinessProfileGreetingText data-id={businessId} />
                <BusinessProfileGetStartedOption data-id={businessId} />
              </TabPanel>
              <TabPanel>
                <br/>
                <BusinessProfileFacebookStaticMenuSettings data-id={businessId} />
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
    )
  }



})

export default BusinessProfilePage;

/*
RELEVANT FACEBOOK POST REQUESTS FOR ADDING AND REMOVING

curl -X POST -H "Content-Type: application/json" -d '{
  "setting_type":"greeting",
  "greeting":{
    "text":"Timeless apparel for the masses."
  }
}' "https://graph.facebook.com/v2.6/me/thread_settings?access_token=PAGE_ACCESS_TOKEN"    
Removing

curl -X DELETE -H "Content-Type: application/json" -d '{
  "setting_type":"greeting"
}' "https://graph.facebook.com/v2.6/me/thread_settings?access_token=PAGE_ACCESS_TOKEN"   
    
Fields

Property Name Description Required
setting_type
Must be greeting
Y
greeting.text
Greeting text
Y
greeting.text must be UTF-8 and has a 160 character limit

*/