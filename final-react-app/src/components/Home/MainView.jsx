function YourFeedTab() {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const currentTab = useSelector((state) => state.articleList.tab);
    const isActiveTab = currentTab === 'feed';
  
    if (!isAuthenticated) {
      return null;
    }
  
    const dispatchChangeTab = () => {
      dispatch(changeTab('feed'));
    };
  
    return (
      <li className="nav-item">
        <button
          type="button"
          className={isActiveTab ? 'nav-link active' : 'nav-link'}
          onClick={dispatchChangeTab}
        >
          Your Feed
        </button>
      </li>
    );
  }