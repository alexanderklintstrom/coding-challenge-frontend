import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { withApollo } from 'react-apollo'
import { withRouter } from 'react-router'
import moment from 'moment'
import { useQuery } from '@apollo/react-hooks'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike'
import gql from 'graphql-tag'
import Spinner from '../Spinner'

const DOCLY_MALMO_LOCATION = '55.607405,12.998945'

const GET_INCIDENTS = gql`
  query {
    incidents(
      proximity: $proximity
      proximitySquare: $proximitySquare
      filter: $filter
    )
      @rest(
        type: "Incidents"
        path: "/incidents?incident_type=theft&proximity={args.proximity}&proximity_square={args.proximitySquare}&query={args.filter}"
      ) {
      incidents @type(name: "Incident") {
        id
        title
        description
        address
        occurred_at
        media
      }
    }
  }
`

const Incidents = ({ filter }) => {
  const history = useHistory()
  const handleClick = useCallback(
    id => {
      history.push(`/incident/${id}`)
    },
    [history],
  )
  const { loading, error, data } = useQuery(GET_INCIDENTS, {
    variables: {
      proximity: DOCLY_MALMO_LOCATION,
      proximitySquare: 9,
      filter,
    },
  })
  if (error) return <span>Oops something went wrong</span>
  if (loading) return <Spinner />

  const {
    incidents: { incidents },
  } = data

  return (
    <List style={{ padding: 0 }}>
      {incidents.map(incident => {
        const imageUrlThumb = incident.media
          ? incident.media.image_url_thumb
          : ''
        const occurredAt = moment(incident.occured_at).format(
          'YYYY-MM-DD hh:mm',
        )
        return (
          <ListItem
            key={incident.id}
            style={{ margin: 0 }}
            onClick={() => handleClick(incident.id)}
            button
          >
            <ListItemAvatar>
              {!imageUrlThumb ? (
                <Avatar>
                  <DirectionsBikeIcon />
                </Avatar>
              ) : (
                <Avatar src={imageUrlThumb} />
              )}
            </ListItemAvatar>
            <Grid
              container
              direction="column"
              justify="space-between"
              alignItems="flex-start"
            >
              <ListItemText
                primary={incident.title}
                secondary={<span>{incident.description}</span>}
              />
              <ListItemText
                secondary={<span>{`${occurredAt} - ${incident.address}`}</span>}
              />
            </Grid>
          </ListItem>
        )
      })}
    </List>
  )
}

Incidents.propTypes = {
  filter: PropTypes.string,
}

export default withRouter(withApollo(Incidents))
