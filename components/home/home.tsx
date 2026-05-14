"use client";
import { Button, Container, Divider, FormControlLabel, Grid, Stack, Switch, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { REMOVE_PREFIX, useItemReducer } from "./item-reducer";
import { selections } from "./const";
import { REMOVE_VALUE, useHistory } from "./use-history";

export function HomePage() {
  const [isAlphabetical, setIsAlphabetical] = useState(false);
  const [items, dispatch] = useItemReducer(isAlphabetical);
  const [history, setHistory] = useHistory();

  const last = useMemo(() => history.length === 0 ? null : history[history.length - 1], [history])
  const [position, description] = useMemo(() => {
    if (last === null) return [0, null];

    let count = 0;
    let foundIndex = -1;
    for (const i in items) {
      const index = Number(i);
      const item = items[index];
      if (item.country === last) {
        foundIndex = index;
        break;
      }
      count += item.count
    }

    if (foundIndex === 0) {
      return [0, "First"]
    } else if (foundIndex === items.length - 1) {
      return [items.length, "Last"];
    } else {
      return [
        count,
        `After ${items[foundIndex -1].country}`
      ]

    }
  }, [items, last]);

  const count = useMemo(() => items.reduce((a,b) => a + b.count, 0), [items])

  const handleSelect = (selection: string) => () => {
    dispatch(selection);
    setHistory(selection);
  }


  return (
    <Container className="h-screen">
      <Stack className="h-screen" divider={<Divider flexItem />}>
        <Stack className="flex-1 justify-center">
          <Stack direction="row" className="justify-center" spacing={2}>
            <Button onClick={() => {
              dispatch(null)
              setHistory(null)
            }}>
              Reset
            </Button>
            <FormControlLabel
              control={<Switch value={isAlphabetical} onClick={() => setIsAlphabetical(s => !s)}/>}
              label="Sort by alphabet"
            />
            <Button onClick={() => {
              dispatch(REMOVE_PREFIX + last)
              setHistory(REMOVE_VALUE)
            }}>
              Undo
            </Button>
          </Stack>
          <Stack className="text-center">
            <Typography variant="h3">Position: {position} {description && `| ${description}`} </Typography>
            <Typography>Count: {count}</Typography>
            {!!last && (
              <Typography>Last: {last}</Typography>
            )}
          </Stack>
        </Stack>
        <Stack className="flex-1">
          <Typography>Click on the selection:</Typography>
          <Grid container spacing={2}>
            {[...selections].sort((p, v) => p.localeCompare(v)).map(selection => (
              <Grid key={selection}>
                <Button variant="contained" onClick={handleSelect(selection)} key={selection}>
                  {selection}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Stack>
    </Container>
  );
}
