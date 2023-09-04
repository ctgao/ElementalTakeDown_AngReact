import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IBasicATK } from 'app/shared/model/basic-atk.model';
import { getEntities } from './basic-atk.reducer';

export const BasicATK = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const basicATKList = useAppSelector(state => state.basicATK.entities);
  const loading = useAppSelector(state => state.basicATK.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="basic-atk-heading" data-cy="BasicATKHeading">
        <Translate contentKey="elementaltakedownApp.basicATK.home.title">Basic ATKS</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="elementaltakedownApp.basicATK.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/basic-atk/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="elementaltakedownApp.basicATK.home.createLabel">Create new Basic ATK</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {basicATKList && basicATKList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="elementaltakedownApp.basicATK.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="elementaltakedownApp.basicATK.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="elementaltakedownApp.basicATK.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="elementaltakedownApp.basicATK.damage">Damage</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {basicATKList.map((basicATK, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/basic-atk/${basicATK.id}`} color="link" size="sm">
                      {basicATK.id}
                    </Button>
                  </td>
                  <td>{basicATK.name}</td>
                  <td>{basicATK.description}</td>
                  <td>{basicATK.damage ? <Link to={`/damage/${basicATK.damage.id}`}>{basicATK.damage.name}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/basic-atk/${basicATK.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/basic-atk/${basicATK.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/basic-atk/${basicATK.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="elementaltakedownApp.basicATK.home.notFound">No Basic ATKS found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default BasicATK;
