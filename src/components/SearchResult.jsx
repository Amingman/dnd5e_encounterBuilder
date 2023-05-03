import {
  Grid,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Pagination,
} from "@mui/material"

import css from "./SearchResult.module.css"
import {
  capitaliseFirstLetter,
  getArrayAtRange,
} from "../utils/generalFunctions"
import { useState } from "react"

export default function SearchResult({
  searchedMonsters,
  setDisplayedMonster,
  displayedMonster,
  setPage,
  page,
  handleAdd,
}) {
  function handlePaginationChange(event, value) {
    setPage(value)
    setDisplayedMonster(getArrayAtRange(searchedMonsters, 15, value))
  }

  return (
    <section>
      <h2>Search Result ({searchedMonsters.length})</h2>
      <Box sx={{ display: { xs: `none`, sm: `block` } }}>
        <Pagination
          count={Math.floor(searchedMonsters.length / 15)}
          color="secondary"
          className={css.pagination}
          size="large"
          siblingCount={1}
          boundaryCount={1}
          page={page}
          onChange={handlePaginationChange}
          showFirstButton
          showLastButton
        />
      </Box>
      <Box sx={{ display: { xs: `block`, sm: `none` } }}>
        <Pagination
          count={Math.floor(searchedMonsters.length / 15)}
          color="secondary"
          className={css.pagination}
          size="small"
          siblingCount={0}
          boundaryCount={0}
          page={page}
          onChange={handlePaginationChange}
          showFirstButton
          showLastButton
        />
      </Box>
      <h3>
        Page: {page} / {Math.floor(searchedMonsters.length / 10)}
      </h3>

      <Grid container spacing={1}>
        {displayedMonster.map(monster => (
          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            lg={2}
            key={monster.name}
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
            // sx={{ width: "100%", height: "100%" }}
          >
            <Card
              variant="outlined"
              style={{
                minHeight: "100%",
                // backgroundColor: `#e0efdf`,
                backgroundColor: `#4EAD89`,
                // backgroundImage: `url(https://www.dnd5eapi.co${monster.image})`,
                // backgroundSize: `cover`,
                backgroundSize: `contain`,
                backgroundPosition: `center`,
                backgroundRepeat: `no-repeat`,
                // backgroundRepeat: `no-repeat`,
                color: `white`,
                textShadow: `2px 2px black`,
              }}
              sx={{ width: "100%", height: "100%" }}
              className={css.cardWrapper}
            >
              <CardContent>
                {/* <CardContent style={{ backgroundColor: `#e0efdf` }}> */}
                {/* {monster.image && (
                  <CardMedia
                    component="img"
                    image={`https://www.dnd5eapi.co${monster.image}`}
                    style={{ maxHeight: `100px` }}
                    // alt="No Image"
                  />
                )} */}

                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  //   color="secondary"
                  size="small"
                  //   style={{
                  //     minHeight: "100%",
                  //     backgroundColor: `#e0efdf`,
                  //     backgroundImage: `url(https://www.dnd5eapi.co${monster.image})`,
                  //     backgroundSize: `cover`,
                  //   }}

                  // style={{ backgroundColor: `#4EAD89` }}
                >
                  {monster.name}
                </Typography>
                <Typography variant="body" component="p">
                  Type: {capitaliseFirstLetter(monster.type)}
                </Typography>
                <Typography variant="body" component="p">
                  Size: {monster.size}
                </Typography>
                <Typography variant="body" component="p">
                  CR: {monster.challenge_rating}
                </Typography>
              </CardContent>
              <CardActions
                // style={{ position: "absolute", bottom: "100%" }}
                className={css.actionButtonWrapper}
              >
                <Button
                  color="secondary"
                  size="small"
                  className={css.actionButton}
                  fullWidth
                  onClick={() => handleAdd(monster)}
                >
                  Add
                </Button>
                {/* <Button
                  color="secondary"
                  size="small"
                  className={css.actionButton}
                >
                  Two
                </Button> */}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <h1></h1>
      <Box sx={{ display: { xs: `none`, sm: `block` } }}>
        <Pagination
          count={Math.floor(searchedMonsters.length / 10)}
          color="secondary"
          className={css.pagination}
          size="large"
          siblingCount={1}
          boundaryCount={1}
          page={page}
          onChange={handlePaginationChange}
          showFirstButton
          showLastButton
        />
      </Box>
      <Box sx={{ display: { xs: `block`, sm: `none` } }}>
        <Pagination
          count={Math.floor(searchedMonsters.length / 10)}
          color="secondary"
          className={css.pagination}
          size="small"
          siblingCount={0}
          boundaryCount={0}
          page={page}
          onChange={handlePaginationChange}
          showFirstButton
          showLastButton
        />
      </Box>
    </section>
  )
}
