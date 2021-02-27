import { createStore } from "vuex";

const debug = process.env.NODE_ENV !== "production";

export default createStore({
  state: {
    agents: [
      {
        domain: "bjstdmngbgr01.thoughtworks.com",
        ip: "192.168.1.102",
        path: "/var/lib/cruise-agent",
        building: true,
        physical: true
      },
      {
        domain: "bjstdmngbgr02.thoughtworks.com",
        ip: "192.168.1.243",
        path: "/var/lib/cruise-agent",
        building: false,
        physical: true
      },
      {
        domain: "bjstdmngbgr03.thoughtworks.com",
        ip: "192.168.1.80",
        path: "/var/lib/cruise-agent",
        building: true,
        physical: false
      },
      {
        domain: "bjstdmngbgr04.thoughtworks.com",
        ip: "192.168.1.117",
        path: "/var/lib/cruise-agent",
        building: false,
        physical: false
      },
      {
        domain: "bjstdmngbgr05.thoughtworks.com",
        ip: "192.168.1.110",
        path: "/var/lib/cruise-agent",
        building: true,
        physical: true
      }
    ],
    histories: [
      "bjstdmngbgr01/Acceptance_test",
      "bjstdmngbgr02/Acceptance_test",
      "bjstdmngbgr03/Acceptance_test",
      "bjstdmngbgr04/Acceptance_test",
      "bjstdmngbgr05/Acceptance_test",
      "bjstdmngbgr06/Acceptance_test",
      "bjstdmngbgr07/Acceptance_test",
      "bjstdmngbgr08/Acceptance_test",
      "bjstdmngbgr09/Acceptance_test",
      "bjstdmngbgr10/Acceptance_test"
    ]
  },
  mutations: {},
  actions: {},
  modules: {},
  strict: debug
});
