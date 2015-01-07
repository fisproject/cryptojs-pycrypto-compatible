#!/usr/bin/env python
# coding: utf-8

from AES_Compatible_Cryptjs import Cryptor
import binascii

iv, encrypted = Cryptor.encrypt('fisproject', Cryptor.KEY)

print "iv : %s" % iv
# => iv  6aa60df8ff95955ec605d5689036ee88
print "encrypted : %s" % binascii.b2a_base64(encrypted).rstrip()
# => encrypted  r19YcF8gc8bgk5NNui6I3w==

decrypted = Cryptor.decrypt('r19YcF8gc8bgk5NNui6I3w==', Cryptor.KEY, '6aa60df8ff95955ec605d5689036ee88')
print "decrypted : %s" % decrypted
# => decrypted : fisproject