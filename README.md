Dummi
=====

Dummi.io is the best way of generating fake user data in many different file formats, quickly and easily. Dummi.io is especially for developers and designers who can use this data to quickly test something in their code or need data for their design. We will continue adding supported file-types as we go and have some cool features planned in the making. Stay tuned for updates and keep an eye on [dummi.io](http://dummi.io/), to be the first in use of all the great features to come. For more updates [follow us on Twitter](https://twitter.com/dummiapp).

So How Does Dummi Work?
-
- Visit [dummi.io](http://dummi.io/) and get started in a flash
- Select in what format you want to have the dummi data
- Name the file (sometimes it will only be the file name, other times it will have part in the data)
- Select the number of data items you want to have
- Add the values and adjust their options to your fitting
- Download the file
- Finally, another way you can generate Dummi Data in one click is by simply choosing a preset!

---

Currently Supported File-Types
-

#### JSON
JSON was the first file-type that we supported, as it is easy for developers to grab data from a JSON file in many different languages and Sketch supports it for designers.

#### CSV
CSV is a very commonly supported file-type not only in development or design but also in just plain Excel sheets or Apples iWork's Numbers. Additionally, its just a simple way to store data in tabular supported format.

---

Retrieving Data from a Dummi File
-
#### Retrieving results from JSON (using jQuery)
```javascript
$.getJSON("pathTo/dummi.json", function(json) {
  var fullName = json.dummi[0].fullName;
  console.log(fullName);
});
```

---

Features and File-Types Planned for the Future
-
#### More and More Value Types
We want to continue adding more and more types of values you can add to your dummi data allowing for hopefully all of your needs being fulfilled.

#### MySQL Support (or just SQL in general)
We are thinking about adding the ability to generate all the SQL needed to create a database with a table and fill it with dummi data all in one go. This could be useful for people who use MySQL in development.

#### More Dummi Data Presets
Presets can be used to load in a set of data in just one click. Select the preset you want and boom! Your done and ready to get goind with your dummi data fresh from the press.

#### User Accounts
Getting an account will allow you to save your generated dummi data and have it for later when you might need it again. This way you can also save custom presets to use when creating new dummi data later on.

---

Contributing
-
Currently we are not sure how we are fully going to handle people contributing to the project as we may one day have to make it private as we might develop into a business. If you are really interested in contributing and may even want to be part of the team please [write to us on Twitter](https://twitter.com/dummiapp), or send a mail to either aaron@dummi.io or marc@dummi.io and we will talk to you and see where that can lead. Otherwise, if you have an undeniably good pull-request we are probably going to accept it and give you credit for it.

#### Contributers
- Bilal Mahmoud (@indietyp)

---

Contact / Socials
-
- Visit [dummi.io](http://dummi.io/)
- [Follow us on Twitter](https://twitter.com/dummiapp)
- Mail either aaron@dummi.io or marc@dummi.io