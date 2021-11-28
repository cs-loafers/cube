from django.test import TestCase

class helloTestCase(TestCase):
    def setUp(self):
        print("hello world")

    def test_hello(self):
        self.assertEqual("hello", "hello")
