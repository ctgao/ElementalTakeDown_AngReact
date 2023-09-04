import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './basic-atk.reducer';

export const BasicATKDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const basicATKEntity = useAppSelector(state => state.basicATK.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="basicATKDetailsHeading">
          <Translate contentKey="elementaltakedownApp.basicATK.detail.title">BasicATK</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{basicATKEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="elementaltakedownApp.basicATK.name">Name</Translate>
            </span>
          </dt>
          <dd>{basicATKEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="elementaltakedownApp.basicATK.description">Description</Translate>
            </span>
          </dt>
          <dd>{basicATKEntity.description}</dd>
          <dt>
            <Translate contentKey="elementaltakedownApp.basicATK.damage">Damage</Translate>
          </dt>
          <dd>{basicATKEntity.damage ? basicATKEntity.damage.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/basic-atk" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/basic-atk/${basicATKEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default BasicATKDetail;
