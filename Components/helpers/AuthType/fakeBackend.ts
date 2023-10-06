import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import * as url from "../url_helper"

import accessToken from "../jwt-token-access/accessToken";

import {
  calenderDefaultCategories,
  events,
  defaultevent,
  apikeyData,
  contactData,
  teamMemberList,
  allRevenueChartData,
  monthRevenueChartData,
  halfYearRevenueChartData,
  yearRevenueChartData
} from "@common/data";

let users = [
  {
    uid: 1,
    username: "Admin",
    role: "Admin",
    password: "123456",
    email: "admin@themesbrand.com",
  },
];

const fakeBackend = () => {
  // This sets the mock adapter on the default instance
  const mock = new MockAdapter(axios, { onNoMatch: "passthrough" });

  mock.onPost(url.POST_FAKE_REGISTER).reply(config => {
    const user = JSON.parse(config["data"]);
    users.push(user);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, user]);
      });
    });
  });

  mock.onPost(url.POST_FAKE_LOGIN).reply(config => {
    const user = JSON.parse(config["data"]);
    const validUser = users.filter(
      usr => usr.email === user.email && usr.password === user.password
    );

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (validUser["length"] === 1) {
          resolve([200, validUser[0]]);
        } else {
          reject(
            "Username and password are invalid. Please enter correct username and password",
          );
        }
      });
    });
  });

  mock.onPost("/fake-forget-pwd").reply(config => {
    // User needs to check that user is eXist or not and send mail for Reset New password

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, "Check you mail and reset your password."]);
      });
    });
  });

  mock.onPost("/post-jwt-register").reply(config => {
    const user = JSON.parse(config["data"]);
    users.push(user);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, user]);
      });
    });
  });

  mock.onPost("/post-jwt-login").reply(config => {
    const user = JSON.parse(config["data"]);
    const validUser = users.filter(
      usr => usr.email === user.email && usr.password === user.password
    );

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (validUser["length"] === 1) {
          // You have to generate AccessToken by jwt. but this is fakeBackend so, right now its dummy
          const token = accessToken;

          // JWT AccessToken
          const tokenObj = { accessToken: token }; // Token Obj
          const validUserObj = { ...validUser[0], ...tokenObj }; // validUser Obj

          resolve([200, validUserObj]);
        } else {
          reject([
            400,
            "Username and password are invalid. Please enter correct username and password",
          ]);
        }
      });
    });
  });

  mock.onPost("/post-jwt-profile").reply(config => {
    const user = JSON.parse(config["data"]);

    const one = config.headers;

    let finalToken = one?.Authorization;

    const validUser = users.filter(usr => usr.uid === user.idx);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Verify Jwt token from header.Authorization
        if (finalToken === accessToken) {
          if (validUser["length"] === 1) {
            let objIndex;

            //Find index of specific object using findIndex method.
            objIndex = users.findIndex(obj => obj.uid === user.idx);

            //Update object's name property.
            users[objIndex].username = user.username;

            // Assign a value to locastorage
            localStorage.removeItem("authUser");
            localStorage.setItem("authUser", JSON.stringify(users[objIndex]));

            resolve([200, "Profile Updated Successfully"]);
          } else {
            reject([400, "Something wrong for edit profile"]);
          }
        } else {
          reject([400, "Invalid Token !!"]);
        }
      });
    });
  });

  mock.onPost(url.POST_EDIT_PROFILE).reply(config => {
    const user = JSON.parse(config["data"]);

    const validUser = users.filter(usr => usr.uid === user.idx);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (validUser["length"] === 1) {
          let objIndex;

          //Find index of specific object using findIndex method.
          objIndex = users.findIndex(obj => obj.uid === user.idx);

          //Update object's name property.
          users[objIndex].username = user.username;

          // Assign a value to locastorage
          localStorage.removeItem("authUser");
          localStorage.setItem("authUser", JSON.stringify(users[objIndex]));

          resolve([200, "Profile Updated Successfully"]);
        } else {
          reject([400, "Something wrong for edit profile"]);
        }
      });
    });
  });

  mock.onPost("/jwt-forget-pwd").reply(config => {
    // User needs to check that user is eXist or not and send mail for Reset New password

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, "Check you mail and reset your password."]);
      });
    });
  });

  mock.onPost("/social-login").reply(config => {
    const user = JSON.parse(config["data"]);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (user && user.token) {
          // You have to generate AccessToken by jwt. but this is fakeBackend so, right now its dummy
          const token = accessToken;

          // JWT AccessToken
          const tokenObj = { accessToken: token }; // Token Obj
          const validUserObj = { ...user[0], ...tokenObj }; // validUser Obj

          resolve([200, validUserObj]);
        } else {
          reject([
            400,
            "Username and password are invalid. Please enter correct username and password",
          ]);
        }
      });
    });
  });

  mock.onGet(url.GET_EVENTS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (events) {
          // Passing fake JSON data as response
          const data = [...events, ...defaultevent];
          resolve([200, data]);
        } else {
          reject([400, "Cannot get events"]);
        }
      });
    });
  });

  mock.onGet(url.GET_CATEGORIES).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (calenderDefaultCategories) {
          // Passing fake JSON data as response
          resolve([200, calenderDefaultCategories]);
        } else {
          reject([400, "Cannot get categories"]);
        }
      });
    });
  });

  mock.onGet(url.GET_UPCOMMINGEVENT).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (defaultevent) {
          // Passing fake JSON data as response
          resolve([200, defaultevent]);
        } else {
          reject([400, "Cannot get upcomming events"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_EVENT).reply((event) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (event && event.data) {
          // Passing fake JSON data as response
          resolve([200, event.data]);
        } else {
          reject([400, "Cannot add event"]);
        }
      });
    });
  });

  mock.onPatch(url.UPDATE_EVENT).reply((event) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (event && event.data) {
          // Passing fake JSON data as response
          resolve([200, event.data]);
        } else {
          reject([400, "Cannot update event"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_EVENT).reply((config) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.event]);
        } else {
          reject([400, "Cannot delete event"]);
        }
      });
    });
  });

  // API Key
  mock.onGet(url.GET_API_KEY).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (apikeyData) {
          // Passing fake JSON data as response
          resolve([200, apikeyData]);
        } else {
          reject([400, "Cannot get API Key Data"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_API_KEY).reply((apikey) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (apikey && apikey.data) {
          // Passing fake JSON data as response
          resolve([200, apikey.data]);
        } else {
          reject([400, "Cannot add API Key"]);
        }
      });
    });
  });

  mock.onPatch(url.UPDATE_API_KEY).reply((apikey) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (apikey && apikey.data) {
          // Passing fake JSON data as response
          resolve([200, apikey.data]);
        } else {
          reject([400, "Cannot update API Key"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_API_KEY).reply((config) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.apikey]);
        } else {
          reject([400, "Cannot delete API Key"]);
        }
      });
    });
  });


  // Contacts
  mock.onGet(url.GET_CONTACTS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (contactData) {
          // Passing fake JSON data as response
          resolve([200, contactData]);
        } else {
          reject([400, "Cannot get Contact Data"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_CONTACT).reply((contact) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (contact && contact.data) {
          // Passing fake JSON data as response
          resolve([200, contact.data]);
        } else {
          reject([400, "Cannot add contact"]);
        }
      });
    });
  });

  mock.onPatch(url.UPDATE_CONTACT).reply((contact) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (contact && contact.data) {
          // Passing fake JSON data as response
          resolve([200, contact.data]);
        } else {
          reject([400, "Cannot update contact"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_CONTACT).reply((config) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.contact]);
        } else {
          reject([400, "Cannot delete contact"]);
        }
      });
    });
  });

  // Team
  mock.onGet(url.GET_TEAM).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (teamMemberList) {
          // Passing fake JSON data as response
          resolve([200, teamMemberList]);
        } else {
          reject([400, "Cannot get Team Data"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_MEMBER).reply((member) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (member && member.data) {
          // Passing fake JSON data as response
          resolve([200, member.data]);
        } else {
          reject([400, "Cannot add Team Member Details"]);
        }
      });
    });
  });

  mock.onPatch(url.UPDATE_MEMBER).reply((member) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (member && member.data) {
          // Passing fake JSON data as response
          resolve([200, member.data]);
        } else {
          reject([400, "Cannot update Team Member Details"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_MEMBER).reply((config) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.member]);
        } else {
          reject([400, "Cannot delete Team Member Details"]);
        }
      });
    });
  });

  mock.onGet(url.GET_ALL_DATA).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (allRevenueChartData) {
          // Passing fake JSON data as response
          resolve([200, allRevenueChartData]);
        } else {
          reject([400, "Cannot get All Chart Data"]);
        }
      });
    });
  });

  mock.onGet(url.GET_MONTHLY_DATA).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (monthRevenueChartData) {
          // Passing fake JSON data as response
          resolve([200, monthRevenueChartData]);
        } else {
          reject([400, "Cannot get Monthly Chart Data"]);
        }
      });
    });
  });
  
  mock.onGet(url.GET_HALFYEARLY_DATA).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (halfYearRevenueChartData) {
          // Passing fake JSON data as response
          resolve([200, halfYearRevenueChartData]);
        } else {
          reject([400, "Cannot get Half Yealy Chart Data"]);
        }
      });
    });
  });

  mock.onGet(url.GET_YEARLY_DATA).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (yearRevenueChartData) {
          // Passing fake JSON data as response
          resolve([200, yearRevenueChartData]);
        } else {
          reject([400, "Cannot get Yealy Chart Data"]);
        }
      });
    });
  });


};

export default fakeBackend;