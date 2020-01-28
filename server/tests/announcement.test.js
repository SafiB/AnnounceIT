/* eslint-disable no-undef */
import chai from 'chai';
import server from '../../server';
import testdata from './testData/testdata';

it('should create an announcement', (done) => {
  const user = testdata[6];
  chai.request(server)
    .post('/api/v1/announcement')
    .send(user)
    .set('Authorization', `Bearer ${userToken}`)
    .end((error, res) => {
      announcementID = res.body.data.id;
      announcementStatus = res.body.data.status;
      res.body.status.should.be.equal(201);
      expect(res.body.message).to.equal('Announcement created successully');
      done();
    });
});
it('should not create an announcement with invalid input', (done) => {
  const user = testdata[7];
  chai.request(server)
    .post('/api/v1/announcement')
    .send(user)
    .set('Authorization', `Bearer ${userToken}`)
    .end((error, res) => {
      res.body.status.should.be.equal(400);
      done();
    });
});
it('should not create an announcement if user did not sign in', (done) => {
  const user = testdata[6];
  chai.request(server)
    .post('/api/v1/announcement')
    .send(user)
    .end((error, res) => {
      res.body.status.should.be.equal(401);
      expect(res.body.error).to.equal('Unauthorized access');
      done();
    });
});
it('should not create duplicated announcement', (done) => {
  const user = testdata[6];
  chai.request(server)
    .post('/api/v1/announcement')
    .send(user)
    .set('Authorization', `Bearer ${userToken}`)
    .end((error, res) => {
      res.body.status.should.be.equal(409);
      expect(res.body.error).to.equal('Announcement already exists');
      done();
    });
});

it('should update an announcement', (done) => {
  const user = testdata[6];
  chai.request(server)
    .patch(`/api/v1/updatedAnnouncement/${announcementID}`)
    .send(user)
    .set('Authorization', `Bearer ${userToken}`)
    .end((error, res) => {
      res.body.status.should.be.equal(200);
      expect(res.body.message).to.equal('Announcement updated successfully');
      done();
    });
});

it('should not update others announcements', (done) => {
  const user = testdata[6];
  chai.request(server)
    .patch(`/api/v1/updatedAnnouncement/${announcementID}`)
    .send(user)
    .set('Authorization', `Bearer ${anotherUserToken}`)
    .end((error, res) => {
      res.body.status.should.be.equal(401);
      expect(res.body.error).to.equal('Unauthorized access');
      done();
    });
});
it('should get all announcements', (done) => {
  chai.request(server)
    .get('/api/v1/allannouncements/')
    .set('Authorization', `Bearer ${userToken}`)
    .end((error, res) => {
      res.body.status.should.be.equal(200);
      expect(res.body.message).to.equal('All your announcements');
      done();
    });
});
it('should get all announcements with a specific status', (done) => {
  chai.request(server)
    .get(`/api/v1/announcements?status=${announcementStatus}`)
    .set('Authorization', `Bearer ${userToken}`)
    .end((error, res) => {
      res.body.status.should.be.equal(200);
      expect(res.body.message).to.equal('Announcements by status');
      done();
    });
});

it('should not get all announcements if no announcement is found with that status', (done) => {
  chai.request(server)
    .get('/api/v1/announcements?status=active')
    .set('Authorization', `Bearer ${userToken}`)
    .end((error, res) => {
      res.body.status.should.be.equal(404);
      expect(res.body.error).to.equal('Announcement not found');
      done();
    });
});

it('should not get all announcements with invalid status', (done) => {
  chai.request(server)
    .get('/api/v1/announcements?status=abc')
    .set('Authorization', `Bearer ${userToken}`)
    .end((error, res) => {
      res.body.status.should.be.equal(400);
      expect(res.body.error).to.equal('Invalid Status');
      done();
    });
});

it('should get an announcement', (done) => {
  chai.request(server)
    .get(`/api/v1/specificannouncement/${announcementID}`)
    .set('Authorization', `Bearer ${userToken}`)
    .end((error, res) => {
      res.body.status.should.be.equal(200);
      expect(res.body.message).to.equal('Annoucement');
      done();
    });
});

it('should work provided invalid routes', (done) => {
  chai.request(server)
    .put(`/api/v0/announcement/${announcementID}`)
    .set('Authorization', `Bearer ${userToken}`)
    .end((error, res) => {
      res.body.status.should.be.equal(400);
      expect(res.body.error).to.equal('Incorrect Route');
      done();
    });
});

it('should change the status an announcement', (done) => {
  chai.request(server)
    .patch(`/api/v1/announcementstatus/${announcementID}?status=active`)
    .set('Authorization', `Bearer ${userToken}`)
    .end((error, res) => {
      res.body.status.should.be.equal(200);
      expect(res.body.message).to.equal('Status changed successfully');
      done();
    });
});

it('should not change the status an announcement provided invalid status', (done) => {
  chai.request(server)
    .patch(`/api/v1/announcementstatus/${announcementID}?status=notAStatus`)
    .set('Authorization', `Bearer ${userToken}`)
    .end((error, res) => {
      res.body.status.should.be.equal(400);
      expect(res.body.error).to.equal('Invalid Status');
      done();
    });
});

it('should view all announcements', (done) => {
  chai.request(server)
    .get('/api/v1/announcements')
    .set('Authorization', `Bearer ${userToken}`)
    .end((error, res) => {
      res.body.status.should.be.equal(200);
      expect(res.body.message).to.equal('All announcements');
      done();
    });
});

it('should delete an announcement', (done) => {
  chai.request(server)
    .delete(`/api/v1/announcement/${announcementID}`)
    .set('Authorization', `Bearer ${userToken}`)
    .end((error, res) => {
      res.body.status.should.be.equal(200);
      expect(res.body.message).to.equal('Announcement Deleted successfully');
      done();
    });
});
