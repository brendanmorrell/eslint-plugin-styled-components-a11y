htmlLangFoo 
     const STYLED = styled.html``const Func = () => <><STYLED lang="foo" /></>n',
    
    
    
  
     const STYLED = styled.html.attrs({ lang: 'foo' })``const Func = () => <><STYLED /></>n',
    
    
    
  
     'n  const STYLED = styled.html.attrs({ lang: 'foo' })``n  const NESTED = styled(STYLED)``n  const Func = () => <><NESTED /></>n',
    
    
    
  
     'n  const STYLED = styled.button.attrs({ lang: 'foo' })``n  const NESTED = styled(STYLED)``n  const Func = () => <><NESTED as="html" /></>n',
    
    
    
