var recognition;

// set our funtion
const setRecognitionAndCore = () => {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onresult = (event) => {
    let last = event.results.length - 1;
    let lastTranscript = event.results[last][0].transcript;
    let interim_transcript = "";
    let final_transcript = "";

    for (var i = event.resultIndex; i < event.results.length; ++i) {
      // Verify if the recognized text is the last with the isFinal property
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;

        // convert string to array to some check on it
        let transcriptArray = final_transcript.split(" ");
        // to open websites

        // important** most website can start with capital letter and some other can start with small letter
        // not in real but when we spoke we not recognize this as a capital letter or it small but the function convert it
        // and to ckeck for it you need alert() to tell you what realy you spoke
        // alert(final_transcript);

        /*
          Our Commands [
            open,
            search||google,
            Back,
            Forward,
            Reload,
            Search in youtube,
            Play music||Change music
          ]
        */

        // [Open Command] -: just say open and the linkTxt you will register it down

        // register your most oppened website here and text that word you will speak in the end
        let myLinks = [
          {
            linkTxt: "Facebook",
            link: "https://www.facebook.com",
          },
          {
            linkTxt: "Messengers",
            link: "https://www.facebook.com/messages",
          },
          {
            linkTxt: "Twitter",
            link: "https://www.twitter.com",
          },
          {
            linkTxt: "ThemeForest",
            link: "https://www.themeforest.net",
          },
          {
            linkTxt: "Google",
            link: "https://www.google.com",
          },
          {
            linkTxt: "YouTube",
            link: "https://www.youtube.com",
          },
          {
            linkTxt: "Instagram.",
            link: "https://www.instagram.com",
          },
          {
            linkTxt: "online ide",
            link: "https://codesandbox.io/",
          },
          {
            linkTxt: "LinkedIn",
            link: "http://www.linkedin.com",
          },
        ];
        if (transcriptArray[0] == "open") {
          for (var i = 0; i < myLinks.length; i++) {
            for (key in myLinks[i]) {
              if (myLinks[i][key].indexOf(transcriptArray[1]) != -1) {
                // you can toggle bettwen open in same tab or new tab
                // _self for same tab || _target for new tab
                // but be carful when you open new tab the old page will
                // stop and recognition start work in the new tab
                window.open(myLinks[i].link, "_self").focus();
              }
            }
          }
        }

        // [Search||Google Command] -: just say search or google before that thing you want search
        if (
          (transcriptArray[0] == "search" &&
            transcriptArray[1] == "about" &&
            transcriptArray[2].length) ||
          (transcriptArray[0] == "Google" && transcriptArray[1].length)
        ) {
          let searchText;
          if (transcriptArray[0] == "Google") {
            searchText = final_transcript.replace("Google", "");
          } else if (transcriptArray[0] == "search") {
            searchText = final_transcript.replace("search about", "");
          }
          window
            .open(`https://www.google.com/search?q=${searchText}`, "_self")
            .focus();
        }

        // [Tanslate Command] -: just say translate before that thing you want translate
        if (transcriptArray[0] == "translate" && transcriptArray.length > 0) {
          transcriptArray.shift(); /* remove translate word from string */
          let textToTranslate =
            transcriptArray.join(
              "%20"
            ); /* convert array to string with %20 instead of space */
          window
            .open(
              `https://translate.google.com/?sl=auto&tl=ar&text=${textToTranslate}&op=translate&hl=ar`,
              "_self"
            )
            .focus();
        }

        // [Back Command] -: go to previous page
        if (final_transcript == "go back" || final_transcript == "back") {
          window.history.back();
        }

        // [Forward Command] -: go to forward page
        if (final_transcript == "go forward" || final_transcript == "forward") {
          window.history.forward();
        }

        // [Reload Command] -: reload current page
        if (final_transcript == "reload" || final_transcript == "refresh") {
          location.reload();
        }

        // [Search in youtube Command] -: just say in the end in youtube and it will take
        // the word you pronounced and search on it in youtube
        if (
          transcriptArray[transcriptArray.length - 2] == "in" &&
          transcriptArray[transcriptArray.length - 1] == "YouTube"
        ) {
          let searchText = final_transcript.replace("in YouTube", "");
          window
            .open(
              `https://www.youtube.com/results?search_query=${searchText}`,
              "_self"
            )
            .focus();
        }

        // [Play music||Change music Command] -: just say play music to play random video or music from list down
        // Note** actually it can open any website too looks like open command
        // but this time only open one website from our list and it open randomly
        let my_songs = [
          "https://www.youtube.com/watch?v=eAod8QNgeDE",
          "https://www.youtube.com/watch?v=tKVzm0SBYtQ",
          "https://www.youtube.com/watch?v=LaVPQe8Zf9o",
          "https://www.youtube.com/watch?v=qhHKu9MDh64",
          "https://www.youtube.com/watch?v=AEoHNeelyiA",
          "https://www.youtube.com/watch?v=kC89MhKddZM",
        ];
        if (
          final_transcript == "play music" ||
          final_transcript == "change music"
        ) {
          let song = my_songs[Math.floor(Math.random() * my_songs.length)];
          if (song.length) {
            window.open(song, "_self").focus();
          }
        }

        // stop the recognition and make it run after 0.5 sec just for reset and make it hear you clear
        // if you talk about anything we stop recognition here for moment before it colse self and it's like loop
        recognition.stop();
        setTimeout(() => {
          recognition.start();
        }, 500);
      }
    }
  };
};

// Run our function
setRecognitionAndCore();

// when audioend make it run again after less of second
recognition.onaudioend = function () {
  setTimeout(() => {
    recognition.start();
  }, 100);
};

// Start Recognition
recognition.start();
