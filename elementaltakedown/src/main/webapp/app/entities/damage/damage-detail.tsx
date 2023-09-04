import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './damage.reducer';

export const DamageDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const damageEntity = useAppSelector(state => state.damage.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="damageDetailsHeading">
          <Translate contentKey="elementaltakedownApp.damage.detail.title">Damage</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{damageEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="elementaltakedownApp.damage.name">Name</Translate>
            </span>
          </dt>
          <dd>{damageEntity.name}</dd>
          <dt>
            <span id="dmgValue">
              <Translate contentKey="elementaltakedownApp.damage.dmgValue">Dmg Value</Translate>
            </span>
          </dt>
          <dd>{damageEntity.dmgValue}</dd>
          <dt>
            <span id="dmgElement">
              <Translate contentKey="elementaltakedownApp.damage.dmgElement">Dmg Element</Translate>
            </span>
          </dt>
          <dd>{damageEntity.dmgElement}</dd>
          <dt>
            <span id="splashDmg">
              <Translate contentKey="elementaltakedownApp.damage.splashDmg">Splash Dmg</Translate>
            </span>
          </dt>
          <dd>{damageEntity.splashDmg}</dd>
          <dt>
            <span id="splashElement">
              <Translate contentKey="elementaltakedownApp.damage.splashElement">Splash Element</Translate>
            </span>
          </dt>
          <dd>{damageEntity.splashElement}</dd>
        </dl>
        <Button tag={Link} to="/damage" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/damage/${damageEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default DamageDetail;
