import unittest
from blockchain_hack.models import Users


class UserModelTester(unittest.TestCase):

    def setUp(self):
        self.new_user = {'email': "minh.vu@u.nus.edu",
                          'staff_id': "123456789",
                          'fullname': "Vu Xuan Minh",
                          'password': "darkmarker_129",
                          "role": "doctor",
                          "department": "Emergency"}

    def test_create_new_staff(self):
        staff = Users.get_user_with_username_and_password(self.new_user['email'], self.new_user['password'])
