import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './character-card.reducer';

export const CharacterCardDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const characterCardEntity = useAppSelector(state => state.characterCard.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="characterCardDetailsHeading">
          <Translate contentKey="elementaltakedownApp.characterCard.detail.title">CharacterCard</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{characterCardEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="elementaltakedownApp.characterCard.name">Name</Translate>
            </span>
          </dt>
          <dd>{characterCardEntity.name}</dd>
          <dt>
            <span id="element">
              <Translate contentKey="elementaltakedownApp.characterCard.element">Element</Translate>
            </span>
          </dt>
          <dd>{characterCardEntity.element}</dd>
          <dt>
            <Translate contentKey="elementaltakedownApp.characterCard.basic">Basic</Translate>
          </dt>
          <dd>{characterCardEntity.basic ? characterCardEntity.basic.name : ''}</dd>
          <dt>
            <Translate contentKey="elementaltakedownApp.characterCard.skill">Skill</Translate>
          </dt>
          <dd>{characterCardEntity.skill ? characterCardEntity.skill.name : ''}</dd>
          <dt>
            <Translate contentKey="elementaltakedownApp.characterCard.ultimate">Ultimate</Translate>
          </dt>
          <dd>{characterCardEntity.ultimate ? characterCardEntity.ultimate.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/character-card" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/character-card/${characterCardEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default CharacterCardDetail;
