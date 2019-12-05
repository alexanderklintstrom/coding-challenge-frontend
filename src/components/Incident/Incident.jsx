import React, { useCallback } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import { withApollo } from 'react-apollo'
import { withRouter } from 'react-router'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import moment from 'moment'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike'
import Spinner from '../Spinner'

const GET_INCIDENT = gql`
  query {
    incident(id: $id) @rest(type: "Incidents", path: "/incidents/{args.id}") {
      incident @type(name: "Incident") {
        id
        title
        description
        address
        occurred_at
        updated_at
        media
        source
      }
    }
  }
`
const useStyles = makeStyles({
  card: {
    maxWidth: 600,
  },
  media: {
    height: 400,
  },
  icon: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '50%',
    fontSize: 300,
  },
})

const Incident = () => {
  const classes = useStyles()
  const history = useHistory()
  const handleClick = useCallback(() => history.push(`/`), [history])
  const { id } = useParams()
  const { loading, error, data } = useQuery(GET_INCIDENT, { variables: { id } })

  if (error)
    return (
      <Link to="/" replace>
        Oops something went wrong
      </Link>
    )
  if (loading) return <Spinner />

  const {
    incident: { incident },
  } = data
  const imageUrl = incident.media ? incident.media.image_url : ''
  const occurredAt = moment(incident.occured_at).format('YYYY-MM-DD hh:mm')
  const updatedAt = moment(incident.updated_at).format('YYYY-MM-DD hh:mm')
  const sourceUrl = incident.source ? incident.source.html_url : ''
  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={handleClick}
        >
          BACK
        </Button>
      </Grid>
      <Grid item xs={12} sm container>
        <Card className={classes.card}>
          <CardActionArea>
            {imageUrl ? (
              <CardMedia
                className={classes.media}
                image={imageUrl}
                title="Stolen Bike"
              />
            ) : (
              <CardMedia className={classes.media} title="Stolen Bike">
                <DirectionsBikeIcon className={classes.icon} />
              </CardMedia>
            )}
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {incident.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {incident.description}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Stolen: {occurredAt}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Reported: ${updatedAt}
              </Typography>
            </CardContent>
          </CardActionArea>
          {sourceUrl !== '' && (
            <CardActions>
              <Button
                size="small"
                color="primary"
                onClick={() => window.open(`${sourceUrl}`, '_blank')}
              >
                More
              </Button>
            </CardActions>
          )}
        </Card>
      </Grid>
    </Grid>
  )
}

export default withRouter(withApollo(Incident))
