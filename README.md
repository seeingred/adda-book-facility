# adda-book-facility

I created this thing personally to book squash court easily for myself. In theory it can be used to book any facility connected to ADDA system.

## Features
- consecutive booking above limits using different flats
- getting session using provided credentials
- convenient interface for booking 
- configuration via .env

## Quick start

You'll require to install [nodejs](https://nodejs.org/en) to run the app. Next run

```sh
npm i
npm start
```

## Configuration

The app has reasonable defaults already set so it can be run without additional configuration. The app is configured through env vars (`.env` file).

You'd probably want to set `FLAT_IDS` to your flat id to use it for booking, otherwise no booking will be displayed in iOS ADDA app.

To get your `flatId` you need to go to
> https://adda.io/myadda/facilities-index.php#/facilities

and check availability for any date and facility with **devtools enabled in your browser**. Switch to network tab in your browser, find the `post_facility.php?action=checkAvailability` request, click on `Payload` and you will see your `flatId` alongside with other data you may need in the `Request_Payload` block.

Setting `EMAIL` and `PASSWORD` will allow you to skip auth process. Your sensitive data is only entered on ADDA sign in page and is not not saved or send any further. Otherwise you'll require to enter your credentials manually.

Refer to `src/constants.ts` file for other available config variables.

