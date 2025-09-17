import React from "react";
import { Typography } from '@mui/material';
import useSound from "use-sound";
import boopSfx from "../../assets/sonidos/sonido.mp3";
export default function Index(props) {
  const { Nombre, color, selectHB, campana,key } = props;
  const [playbackRate, setPlaybackRate] = React.useState(0.75);
  const [audio, setAudio] = React.useState(new Audio(boopSfx));

  const [play, { stop }] = useSound(boopSfx);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      try {
        if (campana) {
          playAudio();
        } else {

        }
      } catch (error) {
      }

    }, 2000);
    return () => {
      clearInterval(intervalId);
    };
  }, [campana, playAudio]);
  const playAudio = React.useCallback(() => {
    const audioPromise = audio.play()
    if (audioPromise !== undefined) {
      audioPromise
        .then(_ => {
          // autoplay started
        })
        .catch(err => {
          // catch dom exception
          console.info(err)
        })
    }
  }, [audio]);


const  pauseAudio=()=> {
  audio.loop = false

}
  return (
    <button
      key={key}
      onClick={() => selectHB()}
      style={{
        background: color,
        width: 200,
        height: 150,
        textAlign: "center",
      }}
    >
      <Typography component={'span'}
        variant="h6"
        key={key}
        style={{ fontSize: 50 }}
      >
        {Nombre}
      </Typography>
    </button>
  );
}
