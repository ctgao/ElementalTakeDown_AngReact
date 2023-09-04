import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './skill-atk.reducer';

export const SkillATKDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const skillATKEntity = useAppSelector(state => state.skillATK.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="skillATKDetailsHeading">
          <Translate contentKey="elementaltakedownApp.skillATK.detail.title">SkillATK</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{skillATKEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="elementaltakedownApp.skillATK.name">Name</Translate>
            </span>
          </dt>
          <dd>{skillATKEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="elementaltakedownApp.skillATK.description">Description</Translate>
            </span>
          </dt>
          <dd>{skillATKEntity.description}</dd>
          <dt>
            <Translate contentKey="elementaltakedownApp.skillATK.damage">Damage</Translate>
          </dt>
          <dd>{skillATKEntity.damage ? skillATKEntity.damage.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/skill-atk" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/skill-atk/${skillATKEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default SkillATKDetail;
